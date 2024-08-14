"use client"
import Admin from '../page'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Table, Button, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';

const columns = [
    {
        title: 'Name',
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
        title: 'Total Appointments',
        dataIndex: '',
    },
    {
        title: 'Registered On',
        dataIndex: 'created_at',
        // sorter: (a, b) => a.status - b.status,
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

const Patient = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false)
    const getPatients = async () => {
        setLoading(true)
        try {
            const response = await axios
                .get('/api/all-patients')
                .then(res => {
                    setPatients(res.data);
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
        getPatients();
    }, [])

    return (
        <Admin>
            <div className='flex justify-between mb-5'>
                <h2 className='text-xl'>All Patients</h2>
                <Link href='/admin/patients/create'>
                    <Button type="primary" icon={<PlusOutlined />} >
                        Add New Patient
                    </Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={patients}
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

export default Patient