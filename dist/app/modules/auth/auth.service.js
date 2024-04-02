"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const decodeToken_1 = require("../../utils/decodeToken");
const logInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload === null || payload === void 0 ? void 0 : payload.email,
        }
    });
    const isCorrectPassword = yield bcrypt_1.default.compareSync(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error('Wrong Password');
    }
    const accessToken = (0, generateToken_1.default)({
        email: userData.email,
        id: userData.id
    }, 'asjchgsccvbfh', '15d');
    const refreshToken = (0, generateToken_1.default)({
        email: userData.email,
        id: userData.id
    }, 'kvhruhgjreakcnklefh', '30d');
    return {
        accessToken,
        refreshToken,
        user: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
        }
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = decodeToken_1.decodedToken.verifyToken(token, 'kvhruhgjreakcnklefh');
    }
    catch (err) {
        throw new Error('You are not authorized');
    }
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData === null || decodedData === void 0 ? void 0 : decodedData.email,
            id: decodedData.id
        }
    });
    const accessToken = (0, generateToken_1.default)({
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
    }, 'asjchgsccvbfh', '15d');
    return {
        accessToken,
    };
});
const createUserIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hashSync(data.password, 10);
    const userData = {
        name: data.name,
        email: data.email,
        password: hashedPassword
    };
    const userProfile = {
        bio: data.bio,
        profession: data.profession,
        address: data.address
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: userData
        });
        const profile = yield transactionClient.userProfile.create({
            data: Object.assign(Object.assign({}, userProfile), { userId: user.id })
        });
        return user;
    }));
    return result;
});
exports.AuthServices = {
    logInUser,
    refreshToken,
    createUserIntoDB
};
