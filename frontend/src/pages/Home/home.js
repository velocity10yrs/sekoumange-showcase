import React,{useEffect} from 'react';
import {Carousel,List,Divider,Typography} from 'antd';
import Article from '../Article/article';

const Home = ()=>{
    const bgc = ['#ace','#aec','#eca','#eef','#9f1'];
    const contentStyle = {
        height:'100%',
        width:'100%',
        lineHeight:'15em',
        textAlign:'center',
        alignItems:'center',
        color:'#fff',
        borderRadius:'1em',
    }
    let ContentList = ['明日天気は晴れ','赤松町の基礎工事は始まりました','次の入札は明日11時まで','台風２５号は発生しています','あけましておめでとうございます'];


    return (
        <div>
            {/*banner*/}
            <div style={{position:'relative',width:'50em',height:'30em',margin:'3em auto',marginBottom:'-3em',borderRadius:'3em'}}>
                <Carousel autoplay arrows effect='fade'>
                    {
                        bgc.map((val,idx)=>(
                            <div key={idx}> <h3 style={{...contentStyle,backgroundColor:val}}>{idx+1}</h3> </div>
                        ))
                    }
                </Carousel>
            </div>
            {/*news*/}
            <div style={{position:'relative',width:'50em',height:'30em',margin:'.5em auto'}}>
                
                <Divider orientation="left">おしらせ</Divider>
                 {/* 原来的list模块 (03.01之前) */}
                {/* <List
                size="small"
                // header={<div>Header</div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={ContentList}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                /> */}
                {/* 内嵌modal+list的article模块(03.02) */}
                <Article/>
            </div>
        </div>
    )
}
export default Home
