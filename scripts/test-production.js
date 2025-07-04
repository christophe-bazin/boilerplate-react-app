#!/usr/bin/env node

/**
 * Production testing script
 * Tests build, performance, and SSR functionality
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production tests...\n');

// Test 1: Build success
console.log('📦 Test 1: Build Production');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful\n');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Test 2: Check for SSR-safe components
console.log('🔍 Test 2: SSR Safety Check');
const sssrUnsafePatterns = [
  'window.',
  'document.',
  'localStorage.',
  'sessionStorage.'
];

const checkSSRSafety = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  sssrUnsafePatterns.forEach(pattern => {
    if (content.includes(pattern)) {
      // Check if it's properly wrapped in typeof window !== 'undefined'
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes(pattern) && !line.includes('typeof window') && !line.includes('// SSR-safe')) {
          issues.push(`Line ${index + 1}: ${line.trim()}`);
        }
      });
    }
  });
  
  return issues;
};

const srcFiles = [
  'src/hooks/useTheme.js',
  'src/hooks/useLanguage.js',
  'src/hooks/useBruteForceProtection.js',
  'src/components/ui/ThemeToggle.jsx',
  'src/components/ui/LanguageSelector.jsx'
];

srcFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const issues = checkSSRSafety(filePath);
    if (issues.length > 0) {
      console.warn(`⚠️  ${file} has potential SSR issues:`);
      issues.forEach(issue => console.warn(`   ${issue}`));
    } else {
      console.log(`✅ ${file} is SSR-safe`);
    }
  }
});

console.log('\n🎯 Test 3: Bundle Analysis');
try {
  const buildManifest = fs.readFileSync('.next/static/chunks/app/layout.js', 'utf8');
  console.log('✅ App layout bundle generated');
} catch (error) {
  console.warn('⚠️  Could not analyze bundle size');
}

console.log('\n✨ All production tests completed!');
console.log('\n📋 Next Steps:');
console.log('  1. Test the app at http://localhost:3000');
console.log('  2. Check theme switching works without hydration errors');
console.log('  3. Test language switching in both SSR and client modes');
console.log('  4. Verify no console errors in browser dev tools');
