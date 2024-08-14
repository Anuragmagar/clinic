"use client"
import Admin from '../page'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Table, Button, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        // dataIndex: 
        showSorterTooltip: {
            target: 'full-header',
        },
        // sorter: (a, b) => a.user.name.localeCompare(b.user.name),
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Reason',
        dataIndex: 'reason',
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.gender.localeCompare(b.gender),
        // render: (gender) => {
        //     const text = gender == 'M' ? 'MALE' : 'FEMALE';
        //     return (
        //         <span>{text}</span>
        //     );
        // },
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

const Holidays = () => {
    const [holidays, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false)
    const getHolidays = async () => {
        setLoading(true)
        try {
            const response = await axios
                .get('/api/holidays')
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
        getHolidays();
    }, [])

    return (
        <Admin>
            <div className='flex justify-between mb-5'>
                <h2 className='text-xl'>All Holidays</h2>
                <Link href='/doctor/holidays/create'>
                    <Button type="primary" icon={<PlusOutlined />} >
                        Add New Holiday
                    </Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={holidays}
                // onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
                bordered={true}
                size='small'
                rowKey='id'
                loading={loading}
            />
        </Admin>
    )
}

export default Holidays