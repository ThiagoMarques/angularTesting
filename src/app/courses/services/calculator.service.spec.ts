import { TestBed } from '@angular/core/testing';
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });
    calculator = TestBed.get(CalculatorService);
  });

  it('Should add two numbers', () => {
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('Should subtract two numbers', () => {
    const result = calculator.subtract(2, 2);
    expect(result).toBe(0, "unexpected subtraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  xit('Should be pending when called', () => {
    pending();
  });

  xit('Should be test fail when called', () => {
    fail();
  });
})
