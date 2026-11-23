import {useEffect} from 'react';
import { LineLayer, PolygonLayer, Popup, Scene, PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
const Map = ()=>{
    useEffect(()=>{
        const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
            style: 'light',
            center: [135.6917, 35.6895],
            zoom: 6,
            scrollZoom: false,
        }),
        });
        scene.on('loaded', () => {
        // fetch('https://gw.alipayobjects.com/os/basement_prod/d36ad90e-3902-4742-b8a2-d93f7e5dafa2.json')
        fetch(`/japan.weather.geo.json`)
            .then((res) => res.json())
            .then((data) => {
                console.log('data');
            const color = [
                'orange',

                'rgb(255,255,217)',

                'rgb(12,44,132)',
            ];
            const layer = new PolygonLayer({})
                .source(data)
                // .scale('density', {
                //     type: 'quantile',
                // })
                .color('weather', color)
                .shape('fill')
                .active(true);
            const layer2 = new LineLayer({ /*这是轮廓线*/
                zIndex: 2,
            })
                .source(data)
                .color('#ace')
                .active(true)
                .size(1)
                .style({
                lineType: 'dash',
                dashArray: [2, 2],
                });
            // 添加文本图层
            const textLayer = new PointLayer({
                zIndex: 3,
            })
            .source(data, {
            parser: {
            type: 'geojson',
            },
            })
            .shape('name') // 绑定州名称
            .size(8) // 字体大小
            .color('#000') // 字体颜色
            .style({
            opacity: 1,
            stroke: '#fff',
            strokeWidth: 1,
            });

            scene.addLayer(textLayer);
            scene.addLayer(layer);
            scene.addLayer(layer2);

            layer.on('mousemove', (e) => {
                const popup = new Popup({
                offsets: [0, 0],
                closeButton: false,
                })
                .setLnglat(e.lngLat)
                .setHTML(`<span>${e.feature.properties.name}: ${e.feature.properties.weather}</span>`);
                scene.addPopup(popup);
            });
            });
        });
    },[]);
    return (
        <div styles={{
                borderRadius:"2em",
                width: "50%",
                height: "50%",
        }}>
            <h3 style={{textAlign:"center",alignItems:"center",color:"#ace",backgroundColor:"rgb(231,255,255,0.7)"}}>天気図</h3>
            <div id='map' style={{
                position:'absolute',
                top:'10em',
                left:'12em',
                right:'12em',
                bottom:'5em',
                border:"3px ridge #cea",
            }}></div>
        </div>
    );
}
export default Map;

/*入门仿写 因缺少API token无效*/
//import {useEffect} from 'react';
//import {Scene,GaodeMap} from '@antv/l7';
// const Map = ()=>{
//     useEffect(()=>{
//         const scene = new Scene({
//             id:'map',
//             map:new GaodeMap({
//                 center:[120,30],
//                 zoom:5,
//                 token:"key密钥",
//             })
//         })
//     },[]);

//     return (
//         <div id='map' style={{
//             position:'absolute',
//             top:0,
//             left:0,
//             right:0,
//             bottom:0
//         }}></div>
//     );
// }

// export default Map;