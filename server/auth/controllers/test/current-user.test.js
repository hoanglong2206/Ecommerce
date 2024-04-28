const {
  authMock,
  authMockRequest,
  authUserPayload,
  authMockResponse,
} = require("./mocks/auth.mock");
const { currentUser } = require("../current-user");
const auth = require("../../services/auth.service");
const { Sequelize } = require("sequelize");

jest.mock("../../services/auth.service");
jest.mock("../../queues/auth.producer");
jest.mock("@elastic/elasticsearch");

const USERNAME = "test";
const PASSWORD = "12345678";

let mockConnection;

describe("CurrentUser", () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    mockConnection = new Sequelize(process.env.MYSQL_DB, {
      dialect: "mysql",
      logging: false,
      dialectOptions: {
        multipleStatements: true,
      },
    });
    await mockConnection.sync({ force: true });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await mockConnection.close();
  });

  describe("currentUser", () => {
    it("should return current user", async () => {
      const req = authMockRequest(
        {},
        { username: USERNAME, password: PASSWORD },
        authUserPayload
      );
      const res = authMockResponse();
      jest.spyOn(auth, "getAuthUserById").mockResolvedValue(authMock);

      await currentUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Authenticated user",
        user: authMock,
      });
    });

    it("should return empty user", async () => {
      const req = authMockRequest(
        {},
        { username: USERNAME, password: PASSWORD },
        authUserPayload
      );
      const res = authMockResponse();
      jest.spyOn(auth, "getAuthUserById").mockResolvedValue({});

      await currentUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Authenticated user",
        user: {},
      });
    });
  });
});
