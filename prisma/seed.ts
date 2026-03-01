import { loadEnvFile } from 'node:process';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

loadEnvFile();

const url = process.env['DATABASE_URL'] ?? 'file:./dev.db';
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create sample users directly (bypassing OAuth for development)
  const alice = await prisma.user.create({
    data: {
      id: 'user_alice',
      name: 'Alice',
      email: 'alice@example.com',
      emailVerified: true,
      image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=alice',
      userId: 'alice',
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    },
  });

  const bob = await prisma.user.create({
    data: {
      id: 'user_bob',
      name: 'Bob',
      email: 'bob@example.com',
      emailVerified: true,
      image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=bob',
      userId: 'bob',
      createdAt: new Date('2024-01-02T00:00:00Z'),
      updatedAt: new Date('2024-01-02T00:00:00Z'),
    },
  });

  const carol = await prisma.user.create({
    data: {
      id: 'user_carol',
      name: 'Carol',
      email: 'carol@example.com',
      emailVerified: true,
      image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=carol',
      userId: 'carol',
      createdAt: new Date('2024-01-03T00:00:00Z'),
      updatedAt: new Date('2024-01-03T00:00:00Z'),
    },
  });

  // Create entries for alice
  const aliceEntry1 = await prisma.entry.create({
    data: {
      title: 'Next.js App Router を使ってみた',
      body: 'Next.js の App Router を使って新しいプロジェクトを立ち上げました。\n\nServer Components と Client Components の使い分けが最初は難しく感じましたが、慣れてくると非常に直感的です。\n\nデータフェッチングが Server Components 側で完結するため、クライアントへの不要なデータ転送が減り、パフォーマンスが向上しました。',
      authorId: alice.id,
      createdAt: new Date('2024-02-01T10:00:00Z'),
    },
  });

  const aliceEntry2 = await prisma.entry.create({
    data: {
      title: 'Prisma 7 の新機能まとめ',
      body: 'Prisma 7 がリリースされ、大きな変更がありました。\n\nドライバーアダプターが必須となり、SQLite を使う場合は better-sqlite3 のアダプターを使うようになりました。\n\nまた、Prisma Client の生成先が node_modules ではなく、プロジェクト内のディレクトリになりました。',
      authorId: alice.id,
      createdAt: new Date('2024-02-15T10:00:00Z'),
    },
  });

  // Create entries for bob
  const bobEntry1 = await prisma.entry.create({
    data: {
      title: 'TypeScript の satisfies 演算子',
      body: 'TypeScript 4.9 で追加された satisfies 演算子がとても便利です。\n\n型チェックをしつつ、型推論も活かすことができます。\n\nこれまで as const と型アサーションを組み合わせていた部分をより安全に書けるようになりました。',
      authorId: bob.id,
      createdAt: new Date('2024-03-01T10:00:00Z'),
    },
  });

  // Create entries for carol
  const carolEntry1 = await prisma.entry.create({
    data: {
      title: 'Better Auth で認証を実装する',
      body: 'Better Auth を使って Next.js アプリケーションに Google 認証を追加しました。\n\nドキュメントが充実しており、セットアップは比較的簡単でした。\n\nカスタムフィールドの追加も additionalFields で簡単にできます。',
      authorId: carol.id,
      createdAt: new Date('2024-03-10T10:00:00Z'),
    },
  });

  // Create comments
  await prisma.comment.createMany({
    data: [
      {
        body: '参考になりました！私も App Router に移行しようと思います。',
        authorId: bob.id,
        entryId: aliceEntry1.id,
        createdAt: new Date('2024-02-02T09:00:00Z'),
      },
      {
        body: 'Server Components の使い方、もう少し詳しく教えてもらえますか？',
        authorId: carol.id,
        entryId: aliceEntry1.id,
        createdAt: new Date('2024-02-02T11:00:00Z'),
      },
      {
        body: 'Prisma 7 の変更、追いかけるのが大変ですね。まとめてくれてありがとうございます。',
        authorId: bob.id,
        entryId: aliceEntry2.id,
        createdAt: new Date('2024-02-16T08:00:00Z'),
      },
      {
        body: 'satisfies 便利ですよね。私も最近よく使っています。',
        authorId: alice.id,
        entryId: bobEntry1.id,
        createdAt: new Date('2024-03-02T10:00:00Z'),
      },
      {
        body: 'Better Auth、試してみます！',
        authorId: alice.id,
        entryId: carolEntry1.id,
        createdAt: new Date('2024-03-11T09:00:00Z'),
      },
      {
        body: 'Google 認証の設定で詰まっていたので助かりました。',
        authorId: bob.id,
        entryId: carolEntry1.id,
        createdAt: new Date('2024-03-11T12:00:00Z'),
      },
    ],
  });

  console.log('Seed completed successfully.');
  console.log(`  Users: alice, bob, carol`);
  console.log(`  Entries: ${[aliceEntry1, aliceEntry2, bobEntry1, carolEntry1].length}`);
  console.log(`  Comments: 6`);
}

await main()
  .catch(console.error)
  // oxlint-disable-next-line typescript/no-misused-promises
  .finally(async () => await prisma.$disconnect());
