# Utiliza uma imagem leve do Node.js baseada em Alpine
FROM node:22-alpine AS base

# Adiciona compatibilidade com musl
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Instala as dependências apenas uma vez
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . . 
COPY next.config.ts ./next.config.ts
RUN npm run build

# Imagem de produção otimizada
FROM base AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_SHARP_PATH="/app/node_modules/sharp"

# Criação de usuário para rodar a aplicação de forma segura
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia apenas os arquivos necessários para rodar em produção
COPY --from=deps /app/public ./public
COPY --from=deps /app/next.config.ts ./next.config.ts
COPY --from=deps /app/.next/standalone ./ 
COPY --from=deps /app/.next/static ./.next/static

# Permissões corretas para pré-renderização
RUN chown -R nextjs:nodejs /app

# Define o usuário para executar a aplicação
USER nextjs

# Define as portas e variáveis de ambiente
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando de inicialização
CMD ["node", "server.js"]