import prisma from '../config/prisma.js';

export const getUsers = async (req, res) => {
  try {
    const getUser = await prisma.user.findMany({orderBy : {id: 'desc'}});
    res.json(getUser);
  } catch (err) {
    console.error('getUser error:', err);
    res.status(500).json({ error: 'Failed to fetch users, server error' });
  }
};
