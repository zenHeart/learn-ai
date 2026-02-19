<script setup>
  const props = defineProps({
    activeCount: {
      type: Number,
      default: 1,
    },
  });
</script>

<template>
  <div class="llm-concepts">
    <!-- 1. 神经元 -->
    <div class="concept-card" :class="{ active: activeCount >= 1 }">
      <div class="concept-label">1. 神经元</div>
      <div class="concept-body">
        <svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
          <!-- 输入节点 -->
          <circle
            cx="70"
            cy="60"
            r="24"
            fill="#e0e7ff"
            stroke="#6366f1"
            stroke-width="1.5"
          />
          <text
            x="70"
            y="66"
            text-anchor="middle"
            style="font-size: 16px"
            fill="#4338ca"
            font-style="italic"
          >
            x₁
          </text>
          <circle
            cx="70"
            cy="150"
            r="24"
            fill="#e0e7ff"
            stroke="#6366f1"
            stroke-width="1.5"
          />
          <text
            x="70"
            y="156"
            text-anchor="middle"
            style="font-size: 16px"
            fill="#4338ca"
            font-style="italic"
          >
            x₂
          </text>
          <circle
            cx="70"
            cy="240"
            r="24"
            fill="#e0e7ff"
            stroke="#6366f1"
            stroke-width="1.5"
          />
          <text
            x="70"
            y="246"
            text-anchor="middle"
            style="font-size: 16px"
            fill="#4338ca"
            font-style="italic"
          >
            x₃
          </text>

          <!-- 权重标签 -->
          <text x="125" y="88" style="font-size: 13px" fill="#64748b">w₁</text>
          <text x="125" y="145" style="font-size: 13px" fill="#64748b">w₂</text>
          <text x="125" y="215" style="font-size: 13px" fill="#64748b">w₃</text>

          <!-- 偏置节点 b -->
          <circle
            cx="130"
            cy="280"
            r="16"
            fill="#fef3c7"
            stroke="#f59e0b"
            stroke-width="1.2"
          />
          <text
            x="130"
            y="285"
            text-anchor="middle"
            style="font-size: 13px"
            fill="#92400e"
          >
            1
          </text>
          <line
            x1="142"
            y1="268"
            x2="195"
            y2="178"
            stroke="#f59e0b"
            stroke-width="1"
            stroke-dasharray="4,3"
          />
          <text
            x="170"
            y="245"
            style="font-size: 13px"
            fill="#92400e"
            font-style="italic"
          >
            b
          </text>

          <!-- 连线：输入 → Sigma -->
          <line
            x1="94"
            y1="60"
            x2="180"
            y2="135"
            stroke="#94a3b8"
            stroke-width="1.2"
          />
          <line
            x1="94"
            y1="150"
            x2="180"
            y2="150"
            stroke="#94a3b8"
            stroke-width="1.2"
          />
          <line
            x1="94"
            y1="240"
            x2="180"
            y2="165"
            stroke="#94a3b8"
            stroke-width="1.2"
          />

          <!-- Sigma 节点 -->
          <circle
            cx="210"
            cy="150"
            r="32"
            fill="#dbeafe"
            stroke="#3b82f6"
            stroke-width="2"
          />
          <text
            x="210"
            y="160"
            text-anchor="middle"
            style="font-size: 26px"
            fill="#1d4ed8"
            font-weight="bold"
          >
            Σ
          </text>

          <!-- 连线：Sigma → h() -->
          <line
            x1="242"
            y1="150"
            x2="290"
            y2="150"
            stroke="#3b82f6"
            stroke-width="1.5"
            marker-end="url(#arr1)"
          />

          <!-- 激活函数 h() -->
          <rect
            x="295"
            y="125"
            width="65"
            height="50"
            rx="6"
            fill="#f0fdf4"
            stroke="#22c55e"
            stroke-width="1.5"
          />
          <text
            x="327"
            y="156"
            text-anchor="middle"
            style="font-size: 18px"
            fill="#15803d"
            font-weight="500"
          >
            h()
          </text>

          <!-- Sigmoid 曲线 (h()框下方) -->
          <g transform="translate(300, 180)">
            <line
              x1="5"
              y1="30"
              x2="55"
              y2="30"
              stroke="#94a3b8"
              stroke-width="0.8"
            />
            <line
              x1="30"
              y1="5"
              x2="30"
              y2="55"
              stroke="#94a3b8"
              stroke-width="0.8"
            />
            <path
              d="M 8,48 C 15,48 22,46 26,38 Q 30,30 34,22 C 38,14 45,12 52,12"
              fill="none"
              stroke="#22c55e"
              stroke-width="2"
              stroke-linecap="round"
            />
          </g>

          <!-- 输出 -->
          <line
            x1="360"
            y1="150"
            x2="420"
            y2="150"
            stroke="#22c55e"
            stroke-width="1.5"
            marker-end="url(#arr2)"
          />

          <defs>
            <marker
              id="arr1"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L0,8 L8,4 z" fill="#3b82f6" />
            </marker>
            <marker
              id="arr2"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L0,8 L8,4 z" fill="#22c55e" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>

    <!-- 2. 神经网络 -->
    <div class="concept-card" :class="{ active: activeCount >= 2 }">
      <div class="concept-label">2. 神经网络</div>
      <div class="concept-body">
        <svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
          <!-- 输入层 (3 nodes) -->
          <circle
            cx="75"
            cy="60"
            r="20"
            fill="#e0e7ff"
            stroke="#6366f1"
            stroke-width="1.5"
          />
          <circle
            cx="75"
            cy="150"
            r="20"
            fill="#e0e7ff"
            stroke="#6366f1"
            stroke-width="1.5"
          />
          <circle
            cx="75"
            cy="240"
            r="20"
            fill="#e0e7ff"
            stroke="#6366f1"
            stroke-width="1.5"
          />
          <!-- 隐藏层 (4 nodes) -->
          <circle
            cx="230"
            cy="38"
            r="20"
            fill="#ede9fe"
            stroke="#8b5cf6"
            stroke-width="1.5"
          />
          <circle
            cx="230"
            cy="113"
            r="20"
            fill="#ede9fe"
            stroke="#8b5cf6"
            stroke-width="1.5"
          />
          <circle
            cx="230"
            cy="188"
            r="20"
            fill="#ede9fe"
            stroke="#8b5cf6"
            stroke-width="1.5"
          />
          <circle
            cx="230"
            cy="263"
            r="20"
            fill="#ede9fe"
            stroke="#8b5cf6"
            stroke-width="1.5"
          />
          <!-- 输出层 (2 nodes) -->
          <circle
            cx="385"
            cy="100"
            r="20"
            fill="#fce7f3"
            stroke="#ec4899"
            stroke-width="1.5"
          />
          <circle
            cx="385"
            cy="200"
            r="20"
            fill="#fce7f3"
            stroke="#ec4899"
            stroke-width="1.5"
          />
          <!-- 连线：输入层 → 隐藏层 -->
          <template v-for="iy in [60, 150, 240]" :key="'in-' + iy">
            <line
              v-for="hy in [38, 113, 188, 263]"
              :key="'l1-' + iy + '-' + hy"
              :x1="95"
              :y1="iy"
              :x2="210"
              :y2="hy"
              stroke="#cbd5e1"
              stroke-width="0.8"
              opacity="0.5"
            />
          </template>
          <!-- 连线：隐藏层 → 输出层 -->
          <template v-for="hy in [38, 113, 188, 263]" :key="'hid-' + hy">
            <line
              v-for="oy in [100, 200]"
              :key="'l2-' + hy + '-' + oy"
              :x1="250"
              :y1="hy"
              :x2="365"
              :y2="oy"
              stroke="#cbd5e1"
              stroke-width="0.8"
              opacity="0.5"
            />
          </template>
        </svg>
      </div>
    </div>

    <!-- 3. Transformer (基于论文 Figure 1 的 Encoder-Decoder 架构) -->
    <div class="concept-card" :class="{ active: activeCount >= 3 }">
      <div class="concept-label">3. Transformer</div>
      <div class="concept-body">
        <svg viewBox="0 0 460 440" xmlns="http://www.w3.org/2000/svg">
          <!-- ===== 1. 顶部: 输入 ===== -->
          <g transform="translate(90, 8)">
            <rect
              width="28"
              height="14"
              rx="3"
              fill="#fecaca"
              stroke="#ef4444"
              stroke-width="0.6"
            />
            <rect
              x="32"
              width="28"
              height="14"
              rx="3"
              fill="#bbf7d0"
              stroke="#22c55e"
              stroke-width="0.6"
            />
            <rect
              x="64"
              width="28"
              height="14"
              rx="3"
              fill="#fde68a"
              stroke="#f59e0b"
              stroke-width="0.6"
            />
            <rect
              x="96"
              width="28"
              height="14"
              rx="3"
              fill="#e0e7ff"
              stroke="#6366f1"
              stroke-width="0.6"
            />
            <rect
              x="128"
              width="28"
              height="14"
              rx="3"
              fill="#fce7f3"
              stroke="#ec4899"
              stroke-width="0.6"
            />
          </g>
          <text
            x="60"
            y="19"
            text-anchor="end"
            style="font-size: 9px"
            fill="#64748b"
          >
            Input
          </text>
          <text
            x="230"
            y="38"
            text-anchor="middle"
            style="font-size: 8px"
            fill="#7c3aed"
            font-weight="500"
          >
            + Positional Encoding
          </text>
          <line
            x1="230"
            y1="42"
            x2="230"
            y2="52"
            stroke="#94a3b8"
            stroke-width="0.8"
          />

          <!-- ===== 2. Encoder (左) ===== -->
          <rect
            x="30"
            y="55"
            width="190"
            height="180"
            rx="8"
            fill="#eff6ff"
            stroke="#3b82f6"
            stroke-width="1.2"
          />
          <text
            x="125"
            y="72"
            text-anchor="middle"
            style="font-size: 10px"
            fill="#1d4ed8"
            font-weight="700"
          >
            Encoder ×N
          </text>

          <!-- Multi-Head Self-Attention -->
          <rect
            x="45"
            y="80"
            width="160"
            height="28"
            rx="4"
            fill="#fff7ed"
            stroke="#f97316"
            stroke-width="1"
          />
          <text
            x="125"
            y="98"
            text-anchor="middle"
            style="font-size: 9px"
            fill="#c2410c"
            font-weight="500"
          >
            Multi-Head Attention
          </text>
          <!-- Add & Norm -->
          <rect
            x="45"
            y="112"
            width="160"
            height="14"
            rx="3"
            fill="#f8fafc"
            stroke="#94a3b8"
            stroke-width="0.6"
          />
          <text
            x="125"
            y="122"
            text-anchor="middle"
            style="font-size: 7px"
            fill="#64748b"
          >
            Add &amp; Norm
          </text>
          <!-- Feed-Forward -->
          <rect
            x="45"
            y="132"
            width="160"
            height="28"
            rx="4"
            fill="#f0fdf4"
            stroke="#22c55e"
            stroke-width="1"
          />
          <text
            x="125"
            y="150"
            text-anchor="middle"
            style="font-size: 9px"
            fill="#15803d"
            font-weight="500"
          >
            Feed-Forward
          </text>
          <!-- Add & Norm -->
          <rect
            x="45"
            y="164"
            width="160"
            height="14"
            rx="3"
            fill="#f8fafc"
            stroke="#94a3b8"
            stroke-width="0.6"
          />
          <text
            x="125"
            y="174"
            text-anchor="middle"
            style="font-size: 7px"
            fill="#64748b"
          >
            Add &amp; Norm
          </text>
          <!-- 残差跳连 -->
          <path
            d="M 210 80 L 216 80 L 216 126 L 210 126"
            fill="none"
            stroke="#94a3b8"
            stroke-width="0.6"
            stroke-dasharray="2,2"
          />
          <path
            d="M 210 132 L 216 132 L 216 178 L 210 178"
            fill="none"
            stroke="#94a3b8"
            stroke-width="0.6"
            stroke-dasharray="2,2"
          />

          <!-- Encoder 输出 -->
          <text
            x="125"
            y="225"
            text-anchor="middle"
            style="font-size: 8px"
            fill="#1d4ed8"
          >
            Encoder Output
          </text>

          <!-- ===== 3. Decoder (右) ===== -->
          <rect
            x="240"
            y="55"
            width="190"
            height="260"
            rx="8"
            fill="#fdf2f8"
            stroke="#ec4899"
            stroke-width="1.2"
          />
          <text
            x="335"
            y="72"
            text-anchor="middle"
            style="font-size: 10px"
            fill="#be185d"
            font-weight="700"
          >
            Decoder ×N
          </text>

          <!-- Masked Multi-Head Attention -->
          <rect
            x="255"
            y="80"
            width="160"
            height="28"
            rx="4"
            fill="#fef3c7"
            stroke="#f59e0b"
            stroke-width="1"
          />
          <text
            x="335"
            y="98"
            text-anchor="middle"
            style="font-size: 8px"
            fill="#92400e"
            font-weight="500"
          >
            Masked Multi-Head Attn
          </text>
          <!-- Add & Norm -->
          <rect
            x="255"
            y="112"
            width="160"
            height="14"
            rx="3"
            fill="#f8fafc"
            stroke="#94a3b8"
            stroke-width="0.6"
          />
          <text
            x="335"
            y="122"
            text-anchor="middle"
            style="font-size: 7px"
            fill="#64748b"
          >
            Add &amp; Norm
          </text>

          <!-- Encoder → Decoder Cross Attention 连线 -->
          <path
            d="M 220 150 L 250 150"
            fill="none"
            stroke="#3b82f6"
            stroke-width="1.2"
            marker-end="url(#arrBlue)"
          />
          <text
            x="235"
            y="143"
            text-anchor="middle"
            style="font-size: 6px"
            fill="#3b82f6"
          >
            K, V
          </text>

          <!-- Cross Multi-Head Attention -->
          <rect
            x="255"
            y="132"
            width="160"
            height="28"
            rx="4"
            fill="#fff7ed"
            stroke="#f97316"
            stroke-width="1"
          />
          <text
            x="335"
            y="150"
            text-anchor="middle"
            style="font-size: 8px"
            fill="#c2410c"
            font-weight="500"
          >
            Cross Multi-Head Attn
          </text>
          <!-- Add & Norm -->
          <rect
            x="255"
            y="164"
            width="160"
            height="14"
            rx="3"
            fill="#f8fafc"
            stroke="#94a3b8"
            stroke-width="0.6"
          />
          <text
            x="335"
            y="174"
            text-anchor="middle"
            style="font-size: 7px"
            fill="#64748b"
          >
            Add &amp; Norm
          </text>
          <!-- Feed-Forward -->
          <rect
            x="255"
            y="184"
            width="160"
            height="28"
            rx="4"
            fill="#f0fdf4"
            stroke="#22c55e"
            stroke-width="1"
          />
          <text
            x="335"
            y="202"
            text-anchor="middle"
            style="font-size: 9px"
            fill="#15803d"
            font-weight="500"
          >
            Feed-Forward
          </text>
          <!-- Add & Norm -->
          <rect
            x="255"
            y="216"
            width="160"
            height="14"
            rx="3"
            fill="#f8fafc"
            stroke="#94a3b8"
            stroke-width="0.6"
          />
          <text
            x="335"
            y="226"
            text-anchor="middle"
            style="font-size: 7px"
            fill="#64748b"
          >
            Add &amp; Norm
          </text>

          <!-- 残差跳连 -->
          <path
            d="M 420 80 L 426 80 L 426 126 L 420 126"
            fill="none"
            stroke="#94a3b8"
            stroke-width="0.6"
            stroke-dasharray="2,2"
          />
          <path
            d="M 420 132 L 426 132 L 426 178 L 420 178"
            fill="none"
            stroke="#94a3b8"
            stroke-width="0.6"
            stroke-dasharray="2,2"
          />
          <path
            d="M 420 184 L 426 184 L 426 230 L 420 230"
            fill="none"
            stroke="#94a3b8"
            stroke-width="0.6"
            stroke-dasharray="2,2"
          />

          <!-- Decoder 输出shifted -->
          <text
            x="335"
            y="305"
            text-anchor="middle"
            style="font-size: 7px"
            fill="#be185d"
          >
            (shifted right)
          </text>

          <!-- ===== 4. 输出层 ===== -->
          <line
            x1="335"
            y1="315"
            x2="335"
            y2="340"
            stroke="#94a3b8"
            stroke-width="0.8"
          />
          <!-- Linear + Softmax -->
          <rect
            x="270"
            y="342"
            width="130"
            height="24"
            rx="4"
            fill="#ede9fe"
            stroke="#8b5cf6"
            stroke-width="1"
          />
          <text
            x="335"
            y="358"
            text-anchor="middle"
            style="font-size: 9px"
            fill="#6d28d9"
            font-weight="600"
          >
            Linear + Softmax
          </text>
          <!-- 向下箭头 -->
          <line
            x1="335"
            y1="366"
            x2="335"
            y2="385"
            stroke="#94a3b8"
            stroke-width="0.8"
          />
          <!-- 输出概率 -->
          <g transform="translate(270, 390)">
            <rect
              width="22"
              height="30"
              rx="2"
              fill="#dbeafe"
              stroke="#3b82f6"
              stroke-width="0.6"
            />
            <rect
              x="24"
              width="22"
              height="22"
              rx="2"
              fill="#e0e7ff"
              stroke="#6366f1"
              stroke-width="0.6"
            />
            <rect
              x="48"
              width="22"
              height="10"
              rx="2"
              fill="#f1f5f9"
              stroke="#94a3b8"
              stroke-width="0.6"
            />
            <rect
              x="72"
              width="22"
              height="16"
              rx="2"
              fill="#ede9fe"
              stroke="#8b5cf6"
              stroke-width="0.6"
            />
            <rect
              x="96"
              width="22"
              height="6"
              rx="2"
              fill="#f8fafc"
              stroke="#cbd5e1"
              stroke-width="0.6"
            />
          </g>
          <text
            x="335"
            y="432"
            text-anchor="middle"
            style="font-size: 8px"
            fill="#475569"
          >
            Output Probabilities
          </text>

          <!-- 箭头标记 -->
          <defs>
            <marker
              id="arrBlue"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .llm-concepts {
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    margin-top: 16px;
    padding: 0 10px;
  }

  .concept-card {
    flex: 1;
    max-width: 30%;
    opacity: 0;
    transform: translateY(10px) scale(0.96);
    transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .concept-card.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .concept-label {
    font-size: 12px;
    font-weight: 700;
    color: #475569;
    text-align: center;
    margin-bottom: 6px;
    padding: 3px 10px;
    background: #f1f5f9;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
  }

  .concept-body {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: #fafbfc;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
  }

  .concept-body svg {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
