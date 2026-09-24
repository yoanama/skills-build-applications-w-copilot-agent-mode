import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'alex', email: 'alex@mergington.edu', displayName: 'Alex Rivera' },
      { username: 'maya', email: 'maya@mergington.edu', displayName: 'Maya Chen' },
      { username: 'liam', email: 'liam@mergington.edu', displayName: 'Liam Patel' },
      { username: 'zoe', email: 'zoe@mergington.edu', displayName: 'Zoe Brooks' },
      { username: 'noah', email: 'noah@mergington.edu', displayName: 'Noah Kim' },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Thunderbolts',
        ownerId: users[0]._id,
        memberIds: [users[0]._id, users[1]._id, users[2]._id],
      },
      {
        name: 'Solar Sprinters',
        ownerId: users[3]._id,
        memberIds: [users[3]._id, users[4]._id],
      },
    ]);

    const activities = await Activity.insertMany([
      { userId: users[0]._id, type: 'running', durationMinutes: 35, points: 180, recordedAt: new Date('2026-09-20T07:30:00Z') },
      { userId: users[1]._id, type: 'walking', durationMinutes: 45, points: 120, recordedAt: new Date('2026-09-21T18:15:00Z') },
      { userId: users[2]._id, type: 'strength', durationMinutes: 50, points: 200, recordedAt: new Date('2026-09-22T17:00:00Z') },
      { userId: users[3]._id, type: 'running', durationMinutes: 28, points: 150, recordedAt: new Date('2026-09-23T06:45:00Z') },
      { userId: users[4]._id, type: 'walking', durationMinutes: 40, points: 110, recordedAt: new Date('2026-09-24T08:00:00Z') },
    ]);

    const leaderboard = await Leaderboard.insertMany([
      { userId: users[0]._id, points: 920, period: 'all-time' },
      { userId: users[2]._id, points: 860, period: 'all-time' },
      { userId: users[3]._id, points: 810, period: 'all-time' },
      { userId: users[1]._id, points: 780, period: 'all-time' },
      { userId: users[4]._id, points: 710, period: 'all-time' },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Morning Sprint Circuit',
        description: 'Fast intervals to build speed and stamina.',
        type: 'running',
        difficulty: 'intermediate',
        durationMinutes: 30,
      },
      {
        title: 'Power Walk Recovery',
        description: 'A calm, steady walk focused on distance and form.',
        type: 'walking',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
      {
        title: 'Core and Strength Builder',
        description: 'Short resistance work for total-body strength and balance.',
        type: 'strength',
        difficulty: 'advanced',
        durationMinutes: 40,
      },
    ]);

    console.log('Database seeding complete', {
      users: users.length,
      teams: teams.length,
      activities: activities.length,
      leaderboard: leaderboard.length,
      workouts: workouts.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
