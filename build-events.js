#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Directories
const eventsDir = path.join(__dirname, 'content', 'events');
const activitiesDir = path.join(__dirname, 'content', 'activities');
const eventsOutputFile = path.join(__dirname, 'events.json');
const activitiesOutputFile = path.join(__dirname, 'activities.json');

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

// Generic function to generate manifest from content directory
function generateManifest(contentDir, outputFile, contentType, sortFn) {
  console.log(`🔨 Building ${contentType} manifest...`);

  // Check if directory exists
  if (!fs.existsSync(contentDir)) {
    console.log(`⚠️  No ${contentType} directory found. Creating empty ${path.basename(outputFile)}`);
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
    return;
  }

  // Read all files in directory
  const files = fs.readdirSync(contentDir);
  const items = [];

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const itemData = parseFrontmatter(content);

      if (itemData) {
        // Add the filename for reference
        itemData._filename = file;
        items.push(itemData);
      }
    }
  });

  console.log(`✅ Found ${items.length} ${contentType}`);

  // Sort using provided sort function
  if (sortFn) {
    items.sort(sortFn);
  }

  // Write to output file
  fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
  console.log(`✅ ${contentType} manifest written to ${outputFile}`);
}

// Run the script
try {
  // Generate events manifest (sorted by date)
  generateManifest(
    eventsDir,
    eventsOutputFile,
    'events',
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Generate activities manifest (sorted by order)
  generateManifest(
    activitiesDir,
    activitiesOutputFile,
    'activities',
    (a, b) => (a.order || 999) - (b.order || 999)
  );

  console.log('\n🎉 All content manifests generated successfully!');
} catch (error) {
  console.error('❌ Error generating content manifests:', error);
  process.exit(1);
}
