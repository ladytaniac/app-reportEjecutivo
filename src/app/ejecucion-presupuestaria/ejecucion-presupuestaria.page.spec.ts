import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EjecucionPresupuestariaPage } from './ejecucion-presupuestaria.page';

describe('EjecucionPresupuestariaPage', () => {
  let component: EjecucionPresupuestariaPage;
  let fixture: ComponentFixture<EjecucionPresupuestariaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EjecucionPresupuestariaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EjecucionPresupuestariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
