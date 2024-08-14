"use client"
import Admin from '../page'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Table, Button, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';

const columns = [
    {
        title: 'Doctor',
        dataIndex: ['user'],
        // dataIndex: 
        showSorterTooltip: {
            target: 'full-header',
        },
        sorter: (a, b) => a.user.name.localeCompare(b.user.name),
        render: (user) => {
            return (
                <div className='flex items-center'>
                    <img
                        src={process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/' + (user.profile != null ? user.profile : 'images/placeholder.jpg')}
                        width={30}
                        height={30}
                        className='rounded-full ring-2 ring-white'
                    />

                    <span className='ml-2'>{user.name}</span>
                </div>
            );
        },
    },
    {
        title: 'E-mail',
        dataIndex: ['user', 'email'],
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.gender.localeCompare(b.gender),
        render: (gender) => {
            const text = gender == 'M' ? 'MALE' : 'FEMALE';
            return (
                <span>{text}</span>
            );
        },
    },
    {
        title: 'Specialization',
        dataIndex: ['specialization', 'name'],
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.specialization.name.localeCompare(b.specialization.name),
        render: (name) => (
            <>
                <Tag color='blue' key={name}>
                    {name ? name.toUpperCase() : 'N/A'}
                </Tag>
            </>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => a.status - b.status,
        render: (status) => {
            const color = status === 1 ? 'green' : 'red';
            const text = status === 1 ? 'Active' : 'Inactive';
            return (
                <Tag color={color} key={status}>
                    {text}
                </Tag>
            );
        },
    },

    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button onClick={() => console.log('hi' + record.id)} shape="circle" icon={<EyeOutlined />} />
                <Button shape="circle" icon={<EditOutlined />} />
                <Button shape="circle" icon={<DeleteOutlined />} />
            </Space>
        ),
    },
];

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false)
    const getDoctors = async () => {
        setLoading(true)
        try {
            const response = await axios
                .get('/api/doctors')
                .then(res => {
                    setDoctors(res.data);
                    setLoading(false)
                }
                )
                .catch(error => {
                    setLoading(false)
                });
        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getDoctors();
    }, [])

    return (
        <Admin>
            <div className='flex justify-between mb-5'>
                <h2 className='text-xl'>All Doctors</h2>
                <Link href='/admin/doctors/create'>
                    <Button type="primary" icon={<PlusOutlined />} >
                        Add New Doctor
                    </Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={doctors}
                // onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
                bordered={true}
                size='middle'
                rowKey='id'
                loading={loading}
            />
        </Admin>
    )
}

export default Doctor