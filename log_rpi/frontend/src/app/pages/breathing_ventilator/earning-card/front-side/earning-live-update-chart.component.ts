/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
  * Dual-licensed under the Single Application / Multi Application License
 * (when this software was purchased) and GNU AFFERO GENERAL PUBLIC LICENSE Version 3
 * (when it was not).
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP / LICENSE_AGPL in the 'docs' folder
 * for license information on type of license applicable.
 */

import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../../@core/utils/layout.service';

@Component({
  selector: 'ngx-earning-live-update-chart',
  styleUrls: ['earning-card-front.component.scss'],
  template: `
    <div echarts
         class="echart"
         [options]="option"
         (chartInit)="onChartInit($event)"></div>
  `,
})
export class EarningLiveUpdateChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  private alive = true;

  @Input() liveUpdateChartData: { value: [string, number] }[];

  option: any;
  echartsInstance;

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(): void {
    if (this.option) {
      this.updateChartOptions(this.liveUpdateChartData);
    }
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        delay(1),
        takeWhile(() => this.alive),
      )
      .subscribe(config => {
        const earningLineTheme: any = config.variables.earningLine;

        this.setChartOption(earningLineTheme);
      });
  }

  setChartOption(earningLineTheme) {
    this.option = {
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      xAxis: {
        type: 'time',
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        boundaryGap: [0, '5%'],
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      tooltip: {
        axisPointer: {
          type: 'shadow',
        },
        textStyle: {
          color: earningLineTheme.tooltipTextColor,
          fontWeight: earningLineTheme.tooltipFontWeight,
          fontSize: earningLineTheme.tooltipFontSize,
        },
        position: 'top',
        backgroundColor: earningLineTheme.tooltipBg,
        borderColor: earningLineTheme.tooltipBorderColor,
        borderWidth: earningLineTheme.tooltipBorderWidth,
        formatter: params => `$ ${Math.round(parseInt(params.value[1], 10))}`,
        extraCssText: earningLineTheme.tooltipExtraCss,
      },
      series: [
        {
              type: 'line',
              smooth: true,
              symbolSize: 20,
              itemStyle: {
                normal: {
                  opacity: 0,
                },
                emphasis: {
                  color: '#ffffff',
                  borderColor: earningLineTheme.itemBorderColor,
                  borderWidth: 2,
                  opacity: 1,
                },
              },
              lineStyle: {
                normal: {
                  width: earningLineTheme.lineWidth,
                  type: earningLineTheme.lineStyle,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: earningLineTheme.lineGradFrom,
                  }, {
                    offset: 1,
                    color: earningLineTheme.lineGradTo,
                  }]),
                  shadowColor: earningLineTheme.lineShadow,
                  shadowBlur: 6,
                  shadowOffsetY: 12,
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: earningLineTheme.areaGradFrom,
                  }, {
                    offset: 1,
                    color: earningLineTheme.areaGradTo,
                  }]),
                },
              },
              data: this.liveUpdateChartData,
            },
      ],
      animation: false,
    };
  }

  updateChartOptions(chartData: { value: [string, number] }[]) {
    this.echartsInstance.setOption({
      series: [{
        data: chartData,
      }],
    });
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
