import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

router.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

router.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('ownerId', 'username displayName'));
  } catch (error) {
    next(error);
  }
});

router.post('/teams', async (request, response, next) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (request, response, next) => {
  try {
    const filter = request.query.userId ? { userId: request.query.userId } : {};
    response.json(await Activity.find(filter).sort({ recordedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/activities', async (request, response, next) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('userId', 'username displayName').sort({ points: -1 }));
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (request, response, next) => {
  try {
    const filter = request.query.difficulty ? { difficulty: request.query.difficulty } : {};
    response.json(await Workout.find(filter).sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/workouts', async (request, response, next) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default router;