import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default {
    getAll: async (req: Request, res: Response) => {
        prisma.entity.findMany({
            include: {
                address: true,
                bankDetails: true,
                memberships: true,
            },
        }).then((entities) => {
            res.json(entities);
        });
    },
    add: async (req: Request, res: Response) => {
        const {
            entityType,
            businessName,
            ownerFirstName,
            ownerLastName,
            phoneNumber,
            email,
            isRegistered,
            upiId,
            status,
            address,
            bankDetails,
        } = req.body;

        const entity = await prisma.entity.create({
            data: {
                entityType,
                businessName,
                ownerFirstName,
                ownerLastName,
                phoneNumber,
                email,
                isRegistered,
                upiId,
                status,
                address: {
                    create: address,
                },
                bankDetails: {
                    create: bankDetails,
                },
            },
        });

        res.json(entity);

    },

    getOne: async (req: Request, res: Response) => {
        const { id } = req.params;

        prisma.entity.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                address: true,
                bankDetails: true,
                memberships: true
            },
        }).then((entity) => {
            res.json(entity);
        });
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const {
            entityType,
            businessName,
            ownerFirstName,
            ownerLastName,
            phoneNumber,
            email,
            isRegistered,
            upiId,
            status,
            address,
            bankDetails,
        } = req.body;

        const entity = await prisma.entity.update({
            where: {
                id: parseInt(id),
            },
            data: {
                entityType,
                businessName,
                ownerFirstName,
                ownerLastName,
                phoneNumber,
                email,
                isRegistered,
                upiId,
                status,
                address: {
                    update: address,
                },
                bankDetails: {
                    update: bankDetails,
                },
            },
        });

        res.json(entity);
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params;

        const entity = await prisma.entity.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json(entity);
    },
}