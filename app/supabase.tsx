'use client'

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from 'react'

export default function Test() {
  const [status, setStatus] = useState('loading')
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from('posts')
      .select('id')
      .limit(1)
      .then(({ error }) => {
        setStatus(error ? error.message : 'connected')
      })
  }, [])

  return <div>{status}</div>
}
