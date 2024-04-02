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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const paginateHelper_1 = require("../../utils/paginateHelper");
const flat_constant_1 = require("./flat.constant");
const addFlatIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.create({
        data: payload,
    });
    return result;
});
const getAllFlatFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginateHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondions = [];
    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR: flat_constant_1.flatSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    ;
    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    ;
    // andCondions.push({
    //     isDeleted: false
    // })
    //console.dir(andCondions, { depth: 'inifinity' })
    const whereConditons = { AND: andCondions };
    const result = yield prisma_1.default.flat.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });
    const total = yield prisma_1.default.flat.count();
    return {
        meta: {
            total,
        },
        data: result
    };
});
const updateFlatFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.flat.findUniqueOrThrow({
        where: {
            id,
        }
    });
    const result = yield prisma_1.default.flat.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.FlatServices = {
    addFlatIntoDB,
    getAllFlatFromDB,
    updateFlatFromDB
};
