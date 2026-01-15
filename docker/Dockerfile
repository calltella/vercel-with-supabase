FROM node:22.22.0-alpine3.23

RUN apk update && \
    apk add --no-cache git curl sudo

RUN (grep -q '^wheel:' /etc/group || addgroup -S wheel) \
 && addgroup node wheel \
 && echo "%wheel ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/wheel \
 && chmod 0440 /etc/sudoers.d/wheel

WORKDIR /app

USER node

EXPOSE 3000

# コンテナ作成
# cd ~/vercel-with-supabase/docker && docker build -t vercel-supabase-app .