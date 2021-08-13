import { Directive, Input, ElementRef, HostListener, ViewContainerRef, ComponentRef,
         ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { TipModel } from './tip.model';
import { HoverTipComponent } from 'src/app/components/hover-tip/hover-tip.component';
import { iif } from 'rxjs';


@Directive({
  selector: '[appTip]',
})
export class TipDirective {
  @Input() appTip:TipModel = {value:''};
  private _hoverTip: ComponentRef<HoverTipComponent> | undefined;
  public factory: ComponentFactory<HoverTipComponent> | undefined;
  constructor(private viewContainer: ViewContainerRef,
              private resolver: ComponentFactoryResolver) {
    this.factory = this.resolver.resolveComponentFactory(HoverTipComponent);
  }

  @HostListener('mouseenter') onMouseEnter() {
    // 清空所有的view    
　　 this.viewContainer.clear();
    // 创建组件
    if(this.factory){
      this._hoverTip = this.viewContainer.createComponent(this.factory);
      // 向组件实例传递参数
      this._hoverTip.instance.tipModel = this.appTip;
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this._hoverTip) {
      　　// 组件销毁
            this._hoverTip.destroy();
    }
  }


}
