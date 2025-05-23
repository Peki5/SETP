import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Space,
  Table,
  Typography,
  message,
} from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';

const { Title } = Typography;

const mockPutovanja = [
  {
    id: '1',
    drzava: 'Francuska',
    grad: 'Pariz',
    datumPocetka: '2024-06-01',
    datumZavrsetka: '2024-06-10',
  },
  {
    id: '2',
    drzava: 'Italija',
    grad: 'Rim',
    datumPocetka: '2024-07-05',
    datumZavrsetka: '2024-07-15',
  },
];

const initialTroskovi = [
  { id: 1, iznos: 50.0, datumTroska: '2024-06-02', putovanjeId: '1' },
  { id: 2, iznos: 120.5, datumTroska: '2024-06-05', putovanjeId: '1' },
  { id: 3, iznos: 70.0, datumTroska: '2024-07-06', putovanjeId: '2' },
];

function PutovanjeTroskovi() {
  const { id } = useParams();
  const putovanje = mockPutovanja.find((p) => p.id === id);
  const [troskovi, setTroskovi] = useState(
    initialTroskovi.filter((t) => t.putovanjeId === id)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrosak, setEditingTrosak] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [form] = Form.useForm();

  const sumaTroskova = troskovi.reduce((acc, curr) => acc + curr.iznos, 0);

  const handleNewClick = () => {
    form.resetFields();
    setEditingTrosak(null);
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    const formatted = {
      id: editingTrosak ? editingTrosak.id : Date.now(),
      iznos: parseFloat(values.iznos),
      datumTroska: values.datumTroska.format('YYYY-MM-DD'),
      putovanjeId: id,
    };

    if (editingTrosak) {
      setTroskovi((prev) =>
        prev.map((t) => (t.id === editingTrosak.id ? formatted : t))
      );
      message.success('Trošak ažuriran.');
    } else {
      setTroskovi((prev) => [...prev, formatted]);
      message.success('Trošak dodan.');
    }

    setIsModalOpen(false);
    setEditingTrosak(null);
    form.resetFields();
  };

  const openEditForm = (record) => {
    setEditingTrosak(record);
    form.setFieldsValue({
      iznos: record.iznos,
      datumTroska: dayjs(record.datumTroska),
    });
    setIsModalOpen(true);
  };

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setTroskovi((prev) => prev.filter((t) => t.id !== toDeleteId));
    setIsDeleteModalOpen(false);
    setToDeleteId(null);
    message.success('Trošak obrisan.');
  };

  const columns = [
    {
      title: 'Iznos (€)',
      dataIndex: 'iznos',
      key: 'iznos',
      render: (value) => `${value.toFixed(2)} €`,
    },
    {
      title: 'Datum troška',
      dataIndex: 'datumTroska',
      key: 'datumTroska',
    },
    {
      title: 'Akcije',
      key: 'akcije',
      render: (_, record) => (
        <Space>
          <EditButton
            onClick={(e) => {
              e.stopPropagation();
              openEditForm(record);
            }}
          />
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              confirmDelete(record.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <Title level={2}>
          Troškovi: {putovanje.drzava}, {putovanje.grad}
        </Title>
        <div style={{ marginBottom: 16, fontWeight: 'bold', fontSize: 16 }}>
          Suma Troškova: {sumaTroskova.toFixed(2)} €
        </div>
        <Button className="novo-button" onClick={handleNewClick}>
          NOVO
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={troskovi}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title={editingTrosak ? 'Uredi trošak' : 'Novi trošak'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingTrosak(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Iznos (€)"
            name="iznos"
            rules={[{ required: true, message: 'Unesite iznos' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0.01}
              step={0.01}
              stringMode
              addonAfter="€"
            />
          </Form.Item>

          <Form.Item
            label="Datum troška"
            name="datumTroska"
            rules={[{ required: true, message: 'Odaberite datum troška' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={(current) =>
                current &&
                (current < dayjs(putovanje.datumPocetka) ||
                  current > dayjs(putovanje.datumZavrsetka))
              }
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Odustani</Button>
              <Button type="primary" htmlType="submit">
                Spremi
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Brisanje troška"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Da"
        cancelText="Ne"
      >
        <p>Jeste li sigurni da želite obrisati ovaj trošak?</p>
      </Modal>
    </div>
  );
}

export default PutovanjeTroskovi;
