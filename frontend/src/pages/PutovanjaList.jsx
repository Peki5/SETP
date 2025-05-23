// PutovanjaList.jsx
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
} from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/PutovanjaList.css';
// or for older versions
// import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;

function PutovanjaList() {
  const [putovanja, setPutovanja] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPutovanje, setEditingPutovanje] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchPutovanja = () => {
    const mockData = [
      {
        id: 1,
        datumPocetka: '2025-05-01',
        datumZavrsetka: '2025-05-05',
        svrha: 'Poslovno',
        opis: 'Put u Beč',
        katPutovanja: { katPutovanjaId: 1 },
        lokacija: { lokacijaId: 2, grad: 'Beč', drzava: 'Austrija' },
      },
      {
        id: 2,
        datumPocetka: '2025-06-10',
        datumZavrsetka: '2025-06-15',
        svrha: 'Odmor',
        opis: 'Put u Rim',
        katPutovanja: { katPutovanjaId: 2 },
        lokacija: { lokacijaId: 3, grad: 'Rim', drzava: 'Italija' },
      },
    ];
    setPutovanja(mockData);
  };

  useEffect(() => {
    fetchPutovanja();
  }, []);

  const openNewForm = () => {
    setEditingPutovanje(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditForm = (record) => {
    setEditingPutovanje(record);
    form.setFieldsValue({
      ...record,
      dateRange: [dayjs(record.datumPocetka), dayjs(record.datumZavrsetka)],
      katPutovanjaId: record.katPutovanja.katPutovanjaId,
      lokacijaId: record.lokacija.lokacijaId,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setPutovanja(putovanja.filter((p) => p.id !== toDeleteId));
    setIsDeleteModalOpen(false);
    setToDeleteId(null);
    message.success('Putovanje je obrisano');
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingPutovanje(null);
  };

  const onFinish = (values) => {
    const body = {
      datumPocetka: values.dateRange[0].format('YYYY-MM-DD'),
      datumZavrsetka: values.dateRange[1].format('YYYY-MM-DD'),
      svrha: values.svrha,
      opis: values.opis,
      katPutovanja: { katPutovanjaId: values.katPutovanjaId },
      lokacija: { lokacijaId: values.lokacijaId, grad: '', drzava: '' },
    };

    if (editingPutovanje) {
      setPutovanja((prev) =>
        prev.map((p) =>
          p.id === editingPutovanje.id ? { ...p, ...body, id: p.id } : p
        )
      );
      message.success('Putovanje je ažurirano');
    } else {
      const newPutovanje = { ...body, id: Date.now() };
      setPutovanja((prev) => [...prev, newPutovanje]);
      message.success('Novo putovanje je dodano');
    }

    setIsModalOpen(false);
    setEditingPutovanje(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Grad',
      dataIndex: ['lokacija', 'grad'],
      key: 'grad',
    },
    {
      title: 'Država',
      dataIndex: ['lokacija', 'drzava'],
      key: 'drzava',
    },
    {
      title: 'Datum početka',
      dataIndex: 'datumPocetka',
      key: 'datumPocetka',
    },
    {
      title: 'Datum završetka',
      dataIndex: 'datumZavrsetka',
      key: 'datumZavrsetka',
    },
    {
      title: 'Akcije',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation(); // <--- STOP event bubbling here
              openEditForm(record);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={(e) => {
              e.stopPropagation(); // <--- STOP event bubbling here
              handleDeleteClick(record.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>Putovanja</h1>
        <Button className="novo-button" onClick={openNewForm}>
          NOVO
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={putovanja}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => navigate(`/putovanja/${record.id}/troskovi`),
        })}
      />
      <Modal
        title={editingPutovanje ? 'Uredi putovanje' : 'Novo putovanje'}
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="lokacijaDrzava"
            label="Država"
            rules={[{ required: true, message: 'Unesite državu' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lokacijaGrad"
            label="Grad"
            rules={[{ required: true, message: 'Unesite grad' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Datum početka i završetka"
            rules={[{ required: true, message: 'Odaberite datume' }]}
          >
            <RangePicker />
          </Form.Item>

          <Form.Item
            name="svrha"
            label="Svrha"
            rules={[{ required: true, message: 'Unesite svrhu' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="opis"
            label="Opis"
            rules={[{ required: true, message: 'Unesite opis' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleModalCancel}>Odustani</Button>
              <Button type="primary" htmlType="submit">
                Spremi
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Potvrda brisanja"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="DA"
        cancelText="NE"
      >
        <p>Jesi li siguran da želiš izbrisati ovo putovanje?</p>
      </Modal>
    </div>
  );
}

export default PutovanjaList;
