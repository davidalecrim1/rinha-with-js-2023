FROM denoland/deno:alpine-2.1.1

WORKDIR /app

COPY ./src ./src

CMD ["deno", "run", "--allow-net", "--allow-read","--allow-env", "./src/main.ts"]