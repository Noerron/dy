import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import { BloggerInfoApi } from "../api/auth";
const columns = [
  {
    title: "昵称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "抖音号",
    dataIndex: "unique_id",
    key: "unique_id",
  },
  {
    title: "年龄",
    dataIndex: "user_age",
    key: "user_age",
  },
  {
    title: "IP属地",
    dataIndex: "ip_location",
    key: "ip_location",
  },
  {
    title: "领域",
    dataIndex: "custom_verify",
    key: "custom_verify",
  },
  {
    title: "作品数量",
    dataIndex: "aweme_count",
    key: "aweme_count",
  },

  {
    title: "关注",
    dataIndex: "following_count",
    key: "following_count",
  },
  {
    title: "粉丝",
    dataIndex: "mplatform_followers_count",
    key: "mplatform_followers_count",
  },
  {
    title: "获赞",
    dataIndex: "total_favorited",
    key: "total_favorited",
  },

  {
    title: "作品",

    render: (_, record) => {
      console.log(record);
      return (
        <Space size="middle">
          <Link
            to={{
              pathname: "/videoinformation",
              query: { user_id: record.key },
            }}
          >
            点击查看作品
          </Link>
        </Space>
      );
    },
  },
];

export default function Blogger_information() {
  // useEffect(() => {
  //   BloggerInfo();
  // }, []);
  // const BloggerInfo = () => {
  //   BloggerInfoApi();
  // };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [bloggerId, setbloggerId] = useState("");
  const [data, setData] = useState([]);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      BloggerInfo();
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setbloggerId(e.target.value);
  };
  const BloggerInfo = async () => {
    const bloggerdata = await BloggerInfoApi({ user_id: bloggerId });
    let data = [
      {
        key: bloggerdata.user.sec_uid,
        name: bloggerdata.user.nickname,
        ip_location: bloggerdata.user.ip_location,
        aweme_count: bloggerdata.user.aweme_count,
        following_count: bloggerdata.user.following_count,
        mplatform_followers_count: bloggerdata.user.mplatform_followers_count,
        total_favorited: bloggerdata.user.total_favorited,
        custom_verify: bloggerdata.user.custom_verify,
        user_age: bloggerdata.user.user_age,
        unique_id: bloggerdata.user.unique_id,
      },
    ];
    setData(data);
  };
  return (
    <>
      <Button onClick={showModal}>添加博主</Button>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Basic usage"
          value={bloggerId}
          onChange={onChange}
        />
      </Modal>
    </>
  );
}
