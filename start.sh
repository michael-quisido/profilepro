#!/bin/bash

case "$1" in
  start)
    pid=$(lsof -t -i:3000 2>/dev/null)
    if [ -n "$pid" ]; then
      echo "Killing existing process on port 3000 (PID: $pid)..."
      kill -9 $pid 2>/dev/null
      sleep 2
    fi
    cd /home/jhona-quisido.com/public_html
    nohup npm run start > /tmp/nextjs.log 2>&1 &
    echo "Next.js server started"
    ;;
  stop)
    pid=$(lsof -t -i:3000 2>/dev/null)
    if [ -n "$pid" ]; then
      kill -9 $pid
      echo "Server stopped"
    else
      echo "No server running on port 3000"
    fi
    ;;
  restart)
    $0 stop
    sleep 2
    $0 start
    ;;
  status)
    if ss -tlnp 2>/dev/null | grep -q ":3000"; then
      pid=$(ss -tlnp 2>/dev/null | grep ":3000" | grep -oP "pid=\K[0-9]+" | head -1)
      echo "Server running on port 3000 (PID: $pid)"
    else
      echo "Server not running"
    fi
    ;;
  log)
    tail -f /tmp/nextjs.log
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status|log}"
    exit 1
    ;;
esac