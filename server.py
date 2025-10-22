"""
Simple HTTP Server for Liliw Tourism Website
Usage: python server.py
Then open: http://localhost:8000
"""

import http.server
import socketserver
import os
import webbrowser
import json
import urllib.parse
import base64
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Enable CORS for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def do_OPTIONS(self):
        """Handle preflight CORS requests"""
        self.send_response(200)
        self.end_headers()
    
    def do_POST(self):
        """Handle POST requests from admin panel"""
        if self.path.startswith('/api/save'):
            self.handle_save_request()
        elif self.path.startswith('/api/upload-image'):
            self.handle_image_upload()
        else:
            self.send_error(404, "API endpoint not found")
    
    def handle_save_request(self):
        """Save JSON data to file"""
        try:
            # Parse the URL to get the page parameter
            parsed_path = urllib.parse.urlparse(self.path)
            query = urllib.parse.parse_qs(parsed_path.query)
            page = query.get('page', [None])[0]
            
            if not page:
                self.send_json_response(400, {'success': False, 'error': 'Page parameter required'})
                return
            
            # Read the JSON data from request body
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Determine the file path based on page type
            file_mapping = {
                'homepage': 'data/homepage-content.json',
                'attractions': 'data/attractions.json',
                'events': 'data/events.json',
                'experiences': 'data/experiences.json',
                'plan-trip': 'data/plan-trip.json',
                'where-to-eat': 'data/where-to-eat.json',
                'where-to-stay': 'data/where-to-stay.json',
                'travel-tips': 'data/travel-tips.json'
            }
            
            filename = file_mapping.get(page)
            if not filename:
                self.send_json_response(400, {'success': False, 'error': f'Unknown page: {page}'})
                return
            
            # Save to file
            file_path = DIRECTORY / filename
            file_path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Saved: {filename}")
            self.send_json_response(200, {
                'success': True, 
                'message': f'Saved {page} successfully',
                'file': filename
            })
            
        except json.JSONDecodeError as e:
            print(f"❌ JSON Error: {e}")
            self.send_json_response(400, {'success': False, 'error': f'Invalid JSON: {str(e)}'})
        except Exception as e:
            print(f"❌ Error saving file: {e}")
            self.send_json_response(500, {'success': False, 'error': str(e)})
    
    def send_json_response(self, status_code, data):
        """Send a JSON response"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def handle_image_upload(self):
        """Handle image upload from admin panel"""
        try:
            # Read the JSON data with image
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            filename = data.get('filename')
            data_url = data.get('dataUrl')
            
            if not filename or not data_url:
                self.send_json_response(400, {'success': False, 'error': 'Missing filename or dataUrl'})
                return
            
            # Extract base64 data from data URL
            # Format: data:image/png;base64,iVBORw0KGgoAAAANS...
            if ',' not in data_url:
                self.send_json_response(400, {'success': False, 'error': 'Invalid data URL format'})
                return
            
            header, base64_data = data_url.split(',', 1)
            image_data = base64.b64decode(base64_data)
            
            # Save to images folder
            images_dir = DIRECTORY / 'images'
            images_dir.mkdir(exist_ok=True)
            
            file_path = images_dir / filename
            with open(file_path, 'wb') as f:
                f.write(image_data)
            
            print(f"✅ Image uploaded: {filename}")
            self.send_json_response(200, {
                'success': True,
                'message': 'Image uploaded successfully',
                'path': f'images/{filename}',
                'filename': filename
            })
            
        except Exception as e:
            print(f"❌ Error uploading image: {e}")
            self.send_json_response(500, {'success': False, 'error': str(e)})

def main():
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("🌴 Liliw Tourism Website - Local Server")
        print("=" * 60)
        print(f"\n✅ Server running at: {url}")
        print(f"📁 Serving files from: {DIRECTORY}")
        print("\n📋 Instructions:")
        print(f"   1. Open your browser to: {url}")
        print("   2. Press Ctrl+C to stop the server")
        print("\n🎯 Ready for stakeholder presentation!\n")
        print("=" * 60)
        
        # Automatically open browser
        try:
            webbrowser.open(url)
            print("🌐 Opening browser automatically...\n")
        except:
            print("⚠️  Please open your browser manually\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Thank you!")
            print("=" * 60)

if __name__ == "__main__":
    main()
