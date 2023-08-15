// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const posts = [
    {id: 10, name: '', disabled: req.query.disabled === 'true'},
    {id: 20, name: '', disabled: req.query.disabled === 'false'},
    {id: 30, name: '', disabled: req.query.disabled === 'false'},
    {id: 40, name: '', disabled: req.query.disabled === 'true'}
  ]

  res.status(200).json({ name: 'John Doe' })
}
