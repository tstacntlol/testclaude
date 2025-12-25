#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Directories
const eventsDir = path.join(__dirname, 'content', 'events');
const outputFile = path.join(__dirname, 'events.json');

// Parse YAML frontmatter from markdown
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Convert boolean strings
      if (value === 'true') value = true;
      if (value === 'false') value = false;

      // Convert numbers
      if (!isNaN(value) && value !== '') {
        const num = Number(value);
        if (!isNaN(num)) value = num;
      }

      frontmatter[key] = value;
    }
  });

  return frontmatter;
}

// Main function
function generateEventsManifest() {
  console.log('🔨 Building events manifest...');

  // Check if events directory exists
  if (!fs.existsSync(eventsDir)) {
    console.log('⚠️  No events directory found. Creating empty events.json');
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
    return;
  }

  // Read all files in events directory
  const files = fs.readdirSync(eventsDir);
  const events = [];

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(eventsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const eventData = parseFrontmatter(content);

      if (eventData) {
        // Add the filename for reference
        eventData._filename = file;
        events.push(eventData);
      }
    }
  });

  console.log(`✅ Found ${events.length} events`);

  // Sort by date
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Write to output file
  fs.writeFileSync(outputFile, JSON.stringify(events, null, 2));
  console.log(`✅ Events manifest written to ${outputFile}`);
}

// Run the script
try {
  generateEventsManifest();
} catch (error) {
  console.error('❌ Error generating events manifest:', error);
  process.exit(1);
}
