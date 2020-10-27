import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

const mockUser = { id: 1, username: 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from repository', async () => {
      const expectedResult = 'test result';
      taskRepository.getTasks.mockResolvedValue(expectedResult);
      expect(taskRepository.getTasks).toHaveBeenCalledTimes(0);

      const filters: GetTaskFilterDto = {
        status: TaskStatus.OPEN,
        search: 'Test search query',
      };

      const result = await tasksService.getTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalledWith(filters, mockUser);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getTaskById', () => {
    const testId = 1;

    it('task found and returned', async () => {
      const expectedResult = {
        title: 'Test title',
        description: 'Test description',
      };
      taskRepository.findOne.mockResolvedValue(expectedResult);

      const result = await tasksService.getTaskById(testId, mockUser);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: testId, userId: mockUser.id },
      });
      expect(result).toEqual(expectedResult);
    });

    it('task not found and error is thrown', async () => {
      // task not found if taskRepository.findOne returns a falsey value
      taskRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById(testId, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('creates task', async () => {
      const expectedResult = {
        title: 'Test title',
        description: 'Test description',
      };
      taskRepository.createTask.mockResolvedValue(expectedResult);

      const taskDetails: CreateTaskDto = expectedResult;

      const result = await tasksService.createTask(taskDetails, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        taskDetails,
        mockUser,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getTaskById', () => {
    const testId = 1;

    it('task found and returned', async () => {
      const expectedResult = {
        title: 'Test title',
        description: 'Test description',
      };
      taskRepository.findOne.mockResolvedValue(expectedResult);

      const result = await tasksService.getTaskById(testId, mockUser);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: testId, userId: mockUser.id },
      });
      expect(result).toEqual(expectedResult);
    });

    it('task not found and error is thrown', async () => {
      // task not found if taskRepository.findOne returns a falsey value
      taskRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById(testId, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteTask', () => {
    const testId = 1;
    it('task found and deleted successfully', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).toHaveBeenCalledTimes(0);

      await tasksService.deleteTask(testId, mockUser);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: testId,
        userId: mockUser.id,
      });
    });

    it('throws error as task could not be found', async () => {
      const testId = 1;

      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(taskRepository.delete).toHaveBeenCalledTimes(0);

      expect(tasksService.deleteTask(testId, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTask', () => {
    it('updates a task status', async () => {
      const testId = 1;
      const expectedStatus = TaskStatus.DONE;
      taskRepository.save.mockResolvedValue(true);

      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
      });

      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      expect(taskRepository.save).not.toHaveBeenCalled();

      const result = await tasksService.updateTaskStatus(
        testId,
        expectedStatus,
        mockUser,
      );

      expect(tasksService.getTaskById).toHaveBeenCalledWith(testId, mockUser);
      expect(taskRepository.save).toHaveBeenCalledWith(result);
      expect(result.status).toEqual(expectedStatus);
    });
  });
});
