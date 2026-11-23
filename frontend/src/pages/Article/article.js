import { Modal , List } from 'antd';
import React , {useState} from 'react';
import css from './article.scss';

const json = [
    { id: 1, title: 'Breaking News: Market Hits Record High', content: 'Stock markets soared today as investors reacted to positive economic data...' },
    { id: 2, title: 'Tech Giant Releases New AI Model', content: 'The latest AI model promises to revolutionize industries with its advanced capabilities...' },
    { id: 3, title: 'New Study Shows Benefits of Green Energy', content: 'Renewable energy sources are proving to be more effective and sustainable...' },
];

const Article = ()=>{
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [selectedArticle,setSelectedArticle] = useState(null);

    const showModal = (json)=>{
        setSelectedArticle(json);
        setIsModalVisible(true);
    };

    const handleClose = ()=>{
        setIsModalVisible(false);
    }

    return (
    <>
        {/*part1 新闻标题*/}
        <List
        bordered
        dataSource={json}
        renderItem={(article) => (
          <List.Item onClick={() => showModal(article)} style={{ cursor: 'pointer' }}>
            {article.title}
          </List.Item>
        )}
        className={`news`}
        />
        { /*part2 弹窗新闻(默认关闭)*/ }
        <Modal
        title={selectedArticle?.title}
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}
        >
        <p>{selectedArticle?.content}</p>
        </Modal>
    </>
    );
};

export default Article;