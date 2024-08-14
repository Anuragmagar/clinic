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
        dataIndex: 'name',
        // dataIndex: 
        showSorterTooltip: {
            target: 'full-header',
        },
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (_, record) => {
            return (
                <div className='flex items-center'>
                    <img
                        src={process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/' + (record.profile != null ? record.profile : 'images/placeholder.jpg')}
                        width={30}
                        height={30}
                        className='rounded-full ring-2 ring-white'
                    />

                    <span className='ml-2'>{record.name}</span>
                </div>
            );
        },
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role_id',
        // sorter: (a, b) => a.status - b.status,
        render: (status) => {
            const color = status === 1 ? 'blue' : 'green';
            const text = status === 1 ? 'Admin' : 'Staff';
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

const Staff = () => {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(false)
    const getStaffs = async () => {
        setLoading(true)
        try {
            const response = await axios
                .get('/api/all-staffs')
                .then(res => {
                    setStaffs(res.data);
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
        getStaffs();
    }, [])

    return (
        <Admin>
            <div className='flex justify-between mb-5'>
                <h2 className='text-xl'>All Staffs</h2>
                <Link href='/admin/staffs/create'>
                    <Button type="primary" icon={<PlusOutlined />} >
                        Add New Staff
                    </Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={staffs}
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

export default Staff