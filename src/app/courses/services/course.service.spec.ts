import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from '../../../../server/db-data';
import { Course } from '../model/course';

describe("CoursesService", () => {
  let coursesService: CoursesService, httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService,

      ]
    });
    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('Should retrieve all courses', () => {
    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy('No courses returned');
      expect(courses.length).toBe(12, "incorrect number of courses");
      const course = courses.find(course => course.id == 12);
      expect(course.titles.description).toBe("Angular Testing Course");
      const req = httpTestingController.expectOne('/api/courses');
      expect(req.request.method).toEqual("GET");
      req.flush({ payload: Object.values(COURSES) });
      httpTestingController.verify();
    });
  });

  it('Should find a course by id', () => {
    coursesService.findCourseById(12).subscribe(courses => {
      expect(courses).toBeTruthy('No courses returned');
      expect(courses.id).toBe(12, "incorrect id of courses");
      const req = httpTestingController.expectOne('/api/courses/12');
      expect(req.request.method).toEqual("GET");
      req.flush(COURSES[12]);
      httpTestingController.verify();
    });
  });

  it('Should find a course by id', () => {
    const changes: Partial<Course> = { titles: { description: 'Testing Course' } }
    coursesService.saveCourse(12, changes).subscribe(course => {
      expect(course.id).toBe(12, "incorrect id of courses");
      const req = httpTestingController.expectOne('/api/courses/12');
      expect(req.request.method).toEqual("PUT");
      expect(req.request.body.titles.description).toEqual(changes.titles.description);
      req.flush({
        ...COURSES[12],
        ...changes
      })
      httpTestingController.verify();
    });
  });

  afterEach(() => {
    // httpTestingController.verify();
  })

});
