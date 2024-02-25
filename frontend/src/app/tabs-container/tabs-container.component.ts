import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit{
  @ContentChildren(TabsComponent) tabs? : QueryList<TabsComponent>
  constructor(){}


  ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter(
      tab => tab.active
    )

    if(!activeTabs || activeTabs.length === 0){
      this.selectTab(this.tabs!.first)
    }
  }

  selectTab(tab: TabsComponent){
    this.tabs?.forEach(tab => {
      tab.active = false
    })

    tab.active = true

    return false;
  }


}
