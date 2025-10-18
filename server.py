"""
Simple HTTP Server for Liliw Tourism Website
Usage: python server.py
Then open: http://localhost:8000
"""

import http.server
import socketserver
import os
import webbrowser
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
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

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
