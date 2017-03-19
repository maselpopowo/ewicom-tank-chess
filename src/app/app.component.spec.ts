import { TestBed, async } from "@angular/core/testing";
import { MdToolbarModule } from "@angular/material";
import { AppComponent } from "./app.component";

describe('AppComponent', () =>{
  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MdToolbarModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() =>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() =>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-toolbar span').textContent).toContain('Ewicom Tank Chess');
  }));
});
