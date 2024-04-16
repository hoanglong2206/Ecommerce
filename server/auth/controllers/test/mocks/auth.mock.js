const authMockRequest = (sessionData, body, currentUser, params) => ({
  session: { data: sessionData },
  body,
  params,
  currentUser,
});

const authMockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const authUserPayload = {
  id: 1,
  username: "test",
  email: "test@test.com",
  iat: 1629757744,
};

const authMock = {
  id: 1,
  username: "test",
  email: "test@test.com",
  emailVerified: 1,
  createdAt: "2023-12-19T07:42:24.431Z",
  comparePassword: () => {},
  hashPassword: () => false,
};

module.exports = {
  authMock,
  authMockRequest,
  authUserPayload,
  authMockResponse,
};
