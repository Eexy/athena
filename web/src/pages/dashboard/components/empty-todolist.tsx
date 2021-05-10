import { Row, Image, Col } from 'antd';
import Title from 'antd/lib/typography/Title';

const EmptyTodoList: React.FC = () => {
  return (
    <div className="empty-todolist-illustration" style={{padding: '2rem 0'}}>
      <Row justify="center">
        <Col>
          <Title level={4} style={{paddingBottom: '1rem'}}>You have no todo to finish</Title>
          <Image src="./media/empty_todolist.svg" preview={false} width={200} />
        </Col>
      </Row>
    </div>
  );
};

export default EmptyTodoList;
