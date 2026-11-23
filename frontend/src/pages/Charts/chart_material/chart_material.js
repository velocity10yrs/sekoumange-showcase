import React from "react";
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';
import css from './chart_material.scss'

// 准备数据
  const data = [
    // {material:"",date:"",price:""},
    {
      material: "鋼材",
      date: "０３０２",
      price: "９９８",
    },
    {
        material: "鋼材",
        date: "０３０１",
        price: "１００１",
      },
      {
        material: "鋼材",
        date: "０２２８",
        price: "９９７",
      },
    {
      material: "砂利",
      date: "０３０１",
      price: "２１８",
    },
    {
        material: "砂利",
        date: "０３０２",
        price: "２１０",
      },
      {
        material: "砂利",
        date: "０２２８",
        price: "２２０",
      },
    {
      material: "セメント",
      date: "０２２８",
      price: "６５８",
    },
    {
        material: "セメント",
        date: "０３０１",
        price: "６４８",
      },
      {
        material: "セメント",
        date: "０３０２",
        price: "６５２",
      },
      {material: "鋼材",date: "０２２７",price: "１００１"},
      {material:"砂利",date:"０２２７",price:"２１８"},
      {material:"セメント",date:"０２２７",price:"６５２"},

      {material: "鋼材",date: "０２２６",price: "１０１０"},
      {material:"砂利",date:"０２２６",price:"２３２"},
      {material:"セメント",date:"０２２６",price:"６６０"},

      {material: "鋼材",date: "０２２５",price: "９９９"},
      {material:"砂利",date:"０２２５",price:"２０２"},
      {material:"セメント",date:"０２２５",price:"６４０"},

      {material: "鋼材",date: "０２２４",price: "１００３"},
      {material:"砂利",date:"０２２４",price:"２１７"},
      {material:"セメント",date:"０２２４",price:"６５０"},

      {material: "鋼材",date: "０２２３",price: "９９０"},
      {material:"砂利",date:"０２２３",price:"２０４"},
      {material:"セメント",date:"０２２３",price:"６４５"},

      {material: "鋼材",date: "０２２２",price: "１０００"},
      {material:"砂利",date:"０２２２",price:"２３５"},
      {material:"セメント",date:"０２２２",price:"６６５"},

      {material: "鋼材",date: "０２２１",price: "９８０"},
      {material:"砂利",date:"０２２１",price:"２３３"},
      {material:"セメント",date:"０２２１",price:"６４３"},  

      {material: "鋼材",date: "０２２０",price: "１０２４"},
      {material:"砂利",date:"０２２０",price:"２４０"},
      {material:"セメント",date:"０２２０",price:"６４０"},  
  ];
// 配置数据
  const s2DataConfig = {
    fields: {
      columns: ["material",],
      rows: ["date",],
      values: ["price"]
    },
    data,
    meta: [
      {
        field: 'material',
        name: '材料',
     },
      {
        field: 'date',
        name: '日付',
      },
      {
        field: 'price',
        name: '値段（円）',
      },
    ],
  };
  const s2Options = {
    width: 777,
    height: 640,
    style: {
        cornerCell: {
            width: 150,
            height: 50,
            bolderText: {
              textAlign: 'center',
              textBaseline: 'middle',
            },
            text: {
              textAlign: 'center',
              textBaseline: 'middle',
            }
          },
        dataCell: {
          width: 150,
          height: 50,
          bolderText: {
            textAlign: 'center',
            textBaseline: 'middle',
          },
          text: {
            textAlign: 'center',
            textBaseline: 'middle',
          }
        },
        rowCell: { //左边表头
            width: 175,
            height: 50,
            bolderText: {
              textAlign: 'center',
              textBaseline: 'middle',
            },
            text: {
              textAlign: 'center',
              textBaseline: 'middle',
            }
        },
        colCell: { //最上排的表头
            width: 198,
            height: 50,
            bolderText: {
              textAlign: 'center',
              textBaseline: 'middle',
            },
            text: {
              textAlign: 'center',
              textBaseline: 'middle',
            }
        },
    },
    conditions: {
        text: [
          {
            // 维度字段，支持正则  /^price+$/
            field: "price",
            mapping(fieldValue, data) {
              return {
                // fill 是文本字段标记下唯一必须的字段，用于指定文本颜色
                fill: "#5B8FF9",
              };
            },
          },
        ],
      },
  };
const Material = () => {
    return (
        <>
        <h3 style={{textAlign:"center",alignItems:"center",color:"#ace",backgroundColor:"rgb(231,255,255,0.7)"}}>建材値段表</h3>
        <div className="material">
            <SheetComponent
            sheetType="pivot"
            dataCfg={s2DataConfig}
            options={s2Options}
            />
        </div>
        </>
      )
}

export default Material;