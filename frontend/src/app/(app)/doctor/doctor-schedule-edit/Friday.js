import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Table, Button, TimePicker, message } from 'antd';
import dayjs from 'dayjs';
import axios from '@/lib/axios';

const EditableCell = ({
    editing,
    dataIndex,
    inputType,
    record,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={[record.hierarchy, dataIndex]}
                    initialValue={record[dataIndex] ? dayjs(record[dataIndex], 'h:mm A') : null}
                    rules={[{ required: true, message: `Please input ${dataIndex}!` }]}
                >
                    <TimePicker
                        className='w-full'
                        format='h:mm A'
                        use12Hours
                        changeOnScroll
                        needConfirm={false}
                    />
                </Form.Item>
            ) : (
                restProps.children
            )}
        </td>
    );
};

const Friday = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [saveLoading, setSaveLoading] = useState(false)
    const [data, setData] = useState([
        [
            {
                hierarchy: '0',
                start_time: dayjs('12:08 AM', 'h:mm A'),
                end_time: dayjs('13:08', 'h:mm'),
            }
        ]
    ]);

    const addNewRow = (index) => {
        const newKey = (parseInt(data[data.length - 1]?.hierarchy, 10) + 1).toString();
        const newRow = {
            hierarchy: newKey,
            start_time: null,
            end_time: null,
        };
        const newData = [...data];
        newData.splice(index + 1, 0, newRow);
        setData(newData);
    };

    const handleSave = async () => {
        setSaveLoading(true);
        try {
            const values = form.getFieldsValue();
            const schedules = Object.keys(values).map(key => {
                const item = values[key];
                return {
                    start_time: item.start_time.format('h:mm A'),
                    end_time: item.end_time ? item.end_time.format('h:mm A') : null,
                };
            });

            await axios.post('/api/doctor-schedule-edit',
                { schedules }
                , { params: { day: 6 } }
            ).then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Schedule edited sucessfully',
                });
                setSaveLoading(false)
            });
        } catch (error) {
            console.error('Error saving schedule:', error);
            messageApi.open({
                type: 'error',
                content: 'Something went wrong',
            });
            setSaveLoading(false)
        }
    };

    const columns = [
        {
            title: 'SNo.',
            dataIndex: 'hierarchy',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            editable: true,
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            editable: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record, index) => (
                <Button
                    type="link"
                    onClick={() => addNewRow(index)}
                >
                    Add New
                </Button>
            ),
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: true,
            }),
        };
    });

    const getSchedules = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/doctor-schedule', { params: { day: 6 } });
            setLoading(false)
            if (response.data.length > 0) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setLoading(false)
        }
    };

    useEffect(() => {
        getSchedules();
    }, []);

    return (
        <Form form={form} component={false}>
            {contextHolder}

            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                // dataSource={data}
                dataSource={data.map((item, index) => ({ ...item, key: item.id || item.hierarchy || index }))}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
                size="small"
                loading={loading}
            />
            <div className="mt-4 flex justify-end gap-x-2">
                <Button>Cancel</Button>
                <Button type="primary" onClick={handleSave} loading={saveLoading}>
                    Save
                </Button>
            </div>
        </Form>
    );
};

export default Friday;
