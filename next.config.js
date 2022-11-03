/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  swcMinify: true,
  reactStrictMode: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  env: {
    domain: 'dapp-boilerplate-v2.epics.dev',
    copyright: 'Epics DAO',
    sitenameJA: 'dApp ボイラープレート for Solana',
    sitenameEN: 'dApp Boilerplate for Solana',
    keywordsJA:
      'dApp, Solana, Boilerplate, Next.js, React, TypeScript, Web3, Anchor, ブロックチェーン',
    keywordsEN:
      'dApp, Solana, Boilerplate, Next.js, React, TypeScript, Web3, Anchor, Blockchain',
    descriptionJA:
      'Solana チェーン上にdAppを構築するためのボイラープレートです。Next.js(React)とTypeScriptを使用しています。',
    descriptionEN:
      "Boilerplate for building dApps on Solana chains. It's using Next.js (React) and TypeScript.",
    twitterAccount: '@EpicsDAO2',
    instagramAccount: 'epics.dao',
    githubAccount: 'EpicsDAO',
    discordInvitationLink: 'https://discord.gg/GmHYfyRamx',
  },
  compiler: {
    emotion: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
  experimental: {
    modularizeImports: {
      '@mui/material': {
        transform: '@mui/material/{{member}}',
      },
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
    },
  },
}

const intercept = require('intercept-stdout')

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

if (process.env.NODE_ENV === 'development') {
  intercept(interceptStdout)
}

module.exports = nextConfig
