import "./feedback.scss";
import DefaultLayout from "@/layouts/default";
import { Form, Input, Button } from "antd/lib";
import { useState } from "react";

const FeedbackPage = () => {
  const [send, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const submitFeedback = (formData: FormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 2000);
  };

  return (
    <DefaultLayout>
      <div className="feedback">
        <h1>Feedback</h1>

        {send && <h1>Thank you for your feedback!</h1>}

        {!send && (
          <Form
            className="feedbackForm"
            onFinish={submitFeedback}
            disabled={isLoading}
          >
            <Form.Item
              label="Name"
              name="name"
              labelCol={{ span: 4 }}
              required={true}
              rules={[
                {
                  required: true,
                  message: "Name must be at least 3 characters",
                  type: "string",
                  min: 3,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 4 }}
              required={true}
              rules={[
                {
                  required: true,
                  message: "Email, please!",
                  type: "email",
                  min: 3,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Topic"
              name="topic"
              labelCol={{ span: 4 }}
              required={false}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              labelCol={{ span: 4 }}
              required={true}
              rules={[
                {
                  required: true,
                  message: "At least 3 characters",
                  type: "string",
                  min: 3,
                },
              ]}
            >
              <Input.TextArea></Input.TextArea>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 2, offset: 20 }}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FeedbackPage;
