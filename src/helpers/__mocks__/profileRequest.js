export const mockUser = {
  displayName: 'Mock User',
  email: 'mock.user@kineticdata.com',
  enabled: true,
  preferredLocale: null,
  spaceAdmin: true,
  username: 'matt.raykowski@kineticdata.com',
};

export const fetchProfile = () => new Promise(
  resolve => process.nextTick(() => resolve(mockUser)),
);

export const putProfile = profile => new Promise(
  resolve => process.nextTick(() => resolve({ user: { ...mockUser, ...profile } })),
);
