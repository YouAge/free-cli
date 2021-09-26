/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: echarts 按需导入
 */


// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
import charts from './chart'

// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  ToolboxComponent,
  AriaComponent,
  AxisPointerComponent,
  BrushComponent,
  CalendarComponent,
DataZoomInsideComponent,
  DataZoomSliderComponent,
 DatasetComponent,
  GeoComponent,
 GraphicComponent,
 GridSimpleComponent,
 LegendComponent,
 LegendPlainComponent,
LegendScrollComponent,
MarkAreaComponent,
 MarkLineComponent,
 MarkPointComponent,
 ParallelComponent,
  PolarComponent,
 RadarComponent,
 SingleAxisComponent,
 TimelineComponent,
  TransformComponent,
   VisualMapContinuousComponent,
 VisualMapPiecewiseComponent

} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
  CanvasRenderer
} from 'echarts/renderers';



// 注册必须的组件
echarts.use(
  [
    ...charts,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    CanvasRenderer,
    ToolboxComponent,
    DataZoomComponent,
    VisualMapComponent,
    AriaComponent,
    AxisPointerComponent,
    BrushComponent,
    CalendarComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent,
    DatasetComponent,
    GeoComponent,
    GraphicComponent,
    GridSimpleComponent,
    LegendComponent,
    LegendPlainComponent,
    LegendScrollComponent,
    MarkAreaComponent,
    MarkLineComponent,
    MarkPointComponent,
    ParallelComponent,
    PolarComponent,
    RadarComponent,
    SingleAxisComponent,
    TimelineComponent,
    TransformComponent,
    VisualMapContinuousComponent,
    VisualMapPiecewiseComponent
  ]
);

//自定义主题
import theme from "./theme.json";
echarts.registerTheme("ovilia-green", theme)

export default echarts;
