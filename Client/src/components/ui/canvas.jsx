import { useEffect } from 'react';

// Global variables (module scope)
let ctx;
let f;
let pos = { x: 0, y: 0 };
let lines = [];
const E = {
    debug: false,
    friction: 0.5,
    trails: 10,
    size: 15,
    dampening: 0.025,
    tension: 0.99,
};

function Oscillator(e) {
    this.init(e || {});
}

Oscillator.prototype = {
    init: function (e) {
        this.phase = e.phase || 0;
        this.offset = e.offset || 0;
        this.frequency = e.frequency || 0.001;
        this.amplitude = e.amplitude || 1;
    },
    update: function () {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
    },
};

function Node() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
}

function Line(e) {
    this.init(e || {});
}

Line.prototype = {
    init: function (e) {
        this.spring = e.spring + 0.1 * Math.random() - 0.05;
        this.friction = E.friction + 0.01 * Math.random() - 0.005;
        this.nodes = [];
        for (let n = 0; n < E.size; n++) {
            const t = new Node();
            t.x = pos.x;
            t.y = pos.y;
            this.nodes.push(t);
        }
    },
    update: function () {
        let spring = this.spring;
        let node = this.nodes[0];

        node.vx += (pos.x - node.x) * spring;
        node.vy += (pos.y - node.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
            node = this.nodes[i];

            if (i > 0) {
                const prev = this.nodes[i - 1];
                node.vx += (prev.x - node.x) * spring;
                node.vy += (prev.y - node.y) * spring;
                node.vx += prev.vx * E.dampening;
                node.vy += prev.vy * E.dampening;
            }

            node.vx *= this.friction;
            node.vy *= this.friction;
            node.x += node.vx;
            node.y += node.vy;

            spring *= E.tension;
        }
    },
    draw: function () {
        let node, next;
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;

        ctx.beginPath();
        ctx.moveTo(x, y);

        let i;
        for (i = 1; i < this.nodes.length - 2; i++) {
            node = this.nodes[i];
            next = this.nodes[i + 1];
            x = 0.5 * (node.x + next.x);
            y = 0.5 * (node.y + next.y);
            ctx.quadraticCurveTo(node.x, node.y, x, y);
        }

        node = this.nodes[i];
        next = this.nodes[i + 1];
        ctx.quadraticCurveTo(node.x, node.y, next.x, next.y);
        ctx.stroke();
        ctx.closePath();
    },
};

function onMousemove(e) {
    if (e.touches) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
    } else {
        pos.x = e.clientX;
        pos.y = e.clientY;
    }
}

function onTouchMove(e) {
    if (e.touches && e.touches.length > 0) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
    }
}

function resizeCanvas() {
    if (ctx && ctx.canvas) {
        ctx.canvas.width = window.innerWidth - 20;
        ctx.canvas.height = window.innerHeight;
    }
}

function render() {
    if (ctx && ctx.running) {
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = "lighter";

        if (f) {
            ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
        }

        ctx.lineWidth = 10;

        for (let i = 0; i < lines.length; i++) {
            lines[i].update();
            lines[i].draw();
        }

        window.requestAnimationFrame(render);
    }
}

export const renderCanvas = function () {
    const canvasElement = document.getElementById("canvas");
    if (!canvasElement) return;

    ctx = canvasElement.getContext("2d");
    ctx.running = true;

    // Initialize oscillator
    f = new Oscillator({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
    });

    // Initialize lines
    lines = [];
    for (let i = 0; i < E.trails; i++) {
        lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
    }

    // Initial position
    pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Event listeners
    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("touchstart", onTouchMove);
    document.removeEventListener("touchmove", onTouchMove);

    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("touchstart", onTouchMove);
    document.addEventListener("touchmove", onTouchMove);

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("focus", () => {
        if (ctx && !ctx.running) {
            ctx.running = true;
            render();
        }
    });
    window.addEventListener("blur", () => {
        // keep running or stop?
    });

    resizeCanvas();
    render();

    // Return cleanup function
    return () => {
        ctx.running = false;
        document.removeEventListener("mousemove", onMousemove);
        document.removeEventListener("touchstart", onTouchMove);
        document.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("resize", resizeCanvas);
    };
};
