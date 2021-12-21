import express, { Request, Response } from 'express'
import { getRepository } from "typeorm";
import { Player } from './entities/player'
import { Match } from './entities/match'

const router = express.Router()

router.post('/api/player', async (req: Request, res: Response) => {
  const playerRepository = getRepository(Player)
  const player = playerRepository.create(req.body)
  console.log(req.body);
  await playerRepository.save(player)
  res.status(200).send(player)
})

router.get('/api/player', async (req: Request, res: Response) => {
  const playerRepository = getRepository(Player)
  const players = await playerRepository.find({ relations: ['matchs'] })
  res.status(200).send(players)
})

router.post('/api/match', async (req: Request, res: Response) => {
  const matchRepository = getRepository(Match)
  const playerRepository = getRepository(Player)
  console.log(req.body);
  const player = await playerRepository.findOne({ where: { id: req.body.player_id } })
  if (!player) {
    res.status(404).send({ error: "PlayerNotFound" })
  }
  delete req.body.player_id
  const match = matchRepository.create({ ...req.body } as Object)
  match.player = player
  await matchRepository.save(match)
  res.status(200).send(match)
})

router.get('/api/match', async (req: Request, res: Response) => {
  const matchRepository = getRepository(Match)
  const matchs = await matchRepository.find()
  res.status(200).send(matchs)
})

router.get('/api/match/attempt-per-level', async (req: Request, res: Response) => {
  const request = await getRepository(Match)
                          .createQueryBuilder('match')
                          .select('COUNT(match.level)', 'count')
                          .addSelect('match.level')
                          .groupBy('match.level')
                          .getRawMany()
  res.status(200).send(request)
})

router.get('/api/match/errors-per-level', async (req: Request, res: Response) => {
  const request = await getRepository(Match)
                          .createQueryBuilder('match')
                          .select('SUM(match.errors)', 'sum')
                          .addSelect('match.level')
                          .groupBy('match.level')
                          .getRawMany()
  res.status(200).send(request)
})

export default router