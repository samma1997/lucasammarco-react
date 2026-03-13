'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   SVG LOGO COMPONENT
   ───────────────────────────────────────────── */

function FestiventLogoSVG({ width = 600, color = '#fff' }: { width?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={width} viewBox="0 0 148 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color, display: 'block' }}>
      <path d="M50.787 26.4041C50.8187 25.7387 50.1566 24.7045 48.8007 23.9897C45.971 22.7701 43.9178 22.1313 42.6412 22.0712L41.9175 22.0377C40.9683 21.9936 40.0615 22.1754 39.2004 22.5831C35.8231 24.228 35.3969 27.8707 35.3952 27.929C35.33 28.3243 35.5008 29.1714 35.5008 29.1714C35.4533 29.1697 35.8636 30.7951 35.8636 30.7951L35.7861 30.9434C36.332 31.7323 37.0838 32.1065 37.9907 32.8707C38.688 33.4584 39.6037 34.0567 41.0476 34.9056C42.0883 35.3309 42.6605 35.7757 42.7644 35.8975C44.314 36.4622 45.3529 36.9105 45.8847 37.2388L45.7843 37.3641C44.0851 37.7542 43.1413 37.9553 41.8629 38.1354L41.8558 38.2872C42.4616 38.2166 43.5216 38.0418 43.5216 38.0418L43.4441 38.1901C40.2517 38.7354 37.2353 39.182 34.3932 39.8738L34.3862 40.0256C34.7613 39.9991 34.9726 39.9885 35.0201 39.9903L35.0905 39.9938L35.08 40.2109C33.9196 40.345 33.3314 40.5639 33.3173 40.8674C32.9564 40.9239 32.7098 41.0351 32.576 41.2028C32.4862 41.7781 32.4492 44.2578 32.4492 44.2578L32.5355 44.4131C33.018 44.4361 35.9498 44.2666 36.8461 44.106C44.0041 42.8335 45.4128 42.3023 45.5537 42.3094C46.9729 41.9987 47.51 41.1004 47.9344 40.6998C48.3394 40.7192 49.4311 39.8367 49.6953 36.8505C49.741 35.8534 50.1654 35.3292 49.3536 34.3355C48.3799 33.4637 45.8689 31.5841 43.4934 30.6769C40.4542 29.2879 39.4223 28.529 39.3325 27.8019L39.3395 27.6501C39.5579 27.6607 39.6706 27.5724 39.6794 27.3836C39.9664 27.17 40.5563 26.6529 42.3436 26.6494C43.0427 26.7253 43.747 26.9618 44.7806 27.2142L45.2473 27.2353L45.1839 27.08L45.2614 26.9318C46.2668 27.1242 47.5892 27.6024 49.0296 28.1619L49.1969 28.1054C49.6812 28.4178 49.9946 28.5767 50.1337 28.5837L50.2975 28.5908C50.4383 28.5978 50.625 27.7083 50.8257 27.08C50.787 26.8894 50.7747 26.6653 50.787 26.4041Z" fill="currentColor"/>
      <path d="M79.1847 16.9415C79.1847 16.9415 79.1653 14.2677 79.1548 14.1865C79.1636 14.1195 78.4081 12.4799 78.4081 12.4799C78.2708 12.3757 75.5837 13.0182 72.8332 13.2176L72.8438 13.29C68.2761 13.7912 67.3498 13.7965 62.8244 14.1918L62.9371 13.0146C63.9654 6.53039 64.3968 2.45523 64.2313 0.789166C63.608 0.305583 63.1554 0.0779112 62.8702 0.10615C62.6501 -0.236241 60.7571 0.36912 60.088 0.436186L59.6953 0.566789L59.5351 0.492663L59.1424 0.623266C59.0244 0.63562 58.8554 0.547375 58.8818 2.8488C58.4574 7.83465 58.0013 11.7616 57.5189 14.633C52.4387 14.949 49.1582 14.7831 49.1001 15.2225C48.9962 15.6161 48.9539 15.8861 48.9733 16.0308C49.0614 16.6592 49.3008 16.6044 49.2005 17.5081C49.1001 18.4099 49.4065 19.3877 49.44 20.1272C49.5773 20.2225 49.6882 20.2648 49.7763 20.2525C51.4843 20.2031 54.2982 20.2331 56.5856 20.0283L56.3778 21.2426C56.4218 21.6926 56.0221 23.8776 55.1787 27.7974C54.9568 28.8052 54.8511 29.3541 54.8599 29.4441C54.4197 30.9743 54.1292 32.3738 53.9848 33.6463L53.9936 33.7363L54.2295 33.5528C53.9883 34.3505 52.7627 40.0441 52.5937 40.5612C52.6729 40.8418 52.7205 41.0783 52.7398 41.2742L52.5444 41.6113L52.6359 41.7613C52.2186 42.5008 52.0249 43.0056 52.0513 43.2756L52.1429 43.4256C52.0425 43.4362 52.0056 43.5756 52.032 43.8457L52.039 43.9127L52.1147 43.9057C52.1147 43.9057 53.6396 44.4652 54.2929 44.1016C54.9462 43.738 55.441 44.5181 55.8495 44.2675C56.0538 44.1422 56.9906 42.7232 57.0628 40.9777C57.135 39.2322 58.4275 35.833 59.2797 31.8214C60.2112 28.2722 60.8082 25.6884 61.0688 24.07C61.4174 21.9733 61.6833 20.8173 61.8647 20.6019L62.0161 19.6401L62.2539 19.6259C62.444 19.5995 66.443 19.2518 71.8911 18.5158L71.9686 18.5052L71.9545 18.4082C71.2907 18.3358 70.8716 18.3129 70.699 18.3376L70.6761 18.1681C72.5356 18.0728 73.483 18.0234 73.5182 18.0181L73.6643 17.9228C74.1926 17.914 74.5307 17.9246 74.6768 17.9546C74.7719 17.8752 74.8793 17.8275 75.0008 17.8099C75.0185 17.8081 75.1259 17.8258 75.3266 17.8628L75.4957 17.741L75.6647 17.8169L75.8073 17.6987C76.1349 17.7675 77.135 17.4392 78.8096 17.2716C78.785 17.0933 78.9118 16.9857 79.1882 16.9468L79.1847 16.9415Z" fill="currentColor"/>
      <path d="M111.863 36.9123L111.874 37.0058L112.06 36.9864L112.032 36.7305C111.923 36.7428 111.867 36.8028 111.863 36.914V36.9123Z" fill="currentColor"/>
      <path d="M112.253 36.1632L112.415 36.1455C112.408 36.0838 112.573 35.6425 112.908 34.8201L112.897 34.7266C112.644 34.9895 112.425 35.4378 112.242 36.0697L112.253 36.1632Z" fill="currentColor"/>
      <path d="M124.208 21.0915C122.535 19.9673 121.087 19.3919 119.862 19.3672L119.769 19.3778C118.714 19.4908 117.046 20.5197 114.761 22.4611C113.185 24.1395 112.403 25.0396 112.417 25.1649C112.417 25.1649 112.593 24.1995 112.648 23.5342C112.889 22.424 112.681 21.7075 112.681 21.7075C113.014 20.3803 112.743 19.6002 112.746 19.286C112.75 18.9736 112.709 18.6648 112.618 18.4583C112.419 18.3383 111.293 18.4901 111.293 18.4901L110.858 18.6154C109.01 18.9772 109.489 18.6189 108.98 18.8854C108.892 18.9419 108.777 18.9772 108.638 18.9931L108.196 19.0407C108.224 19.3054 108.036 19.7308 107.972 20.3185L107.944 21.981C107.891 23.3841 108.245 24.6531 107.293 29.2171C105.72 38.2464 104.348 42.8245 104.421 43.5075L104.431 43.6011C105.095 43.6558 105.433 43.737 105.446 43.8464C107.016 44.1641 107.453 44.4747 108.002 44.7765C108.157 44.7606 108.395 44.7024 108.714 44.6053L108.909 44.6777L109.499 44.2611L111.705 37.8493L111.695 37.7557L111.508 37.7751L110.661 39.9636C110.251 41.2643 109.962 41.9244 109.791 41.9421L109.784 41.8715C110.888 37.9816 112.493 34.0865 114.599 30.1825C115.236 29.4077 115.551 28.9806 115.542 28.903C116.294 28.0205 116.664 27.5264 116.654 27.4169L116.724 27.4099L116.735 27.5034C115.773 28.9259 115.011 30.2178 114.445 31.3791L114.456 31.4727C115.718 29.4995 116.604 28.1935 117.117 27.5581C118.298 26.1427 118.789 25.6538 118.789 25.6538L119.045 25.6256C119.004 26.8557 119.112 28.3382 119.135 28.5571C117.856 37.8175 117.349 46.7302 117.383 47.0409L117.402 47.2279L117.564 47.2103C117.552 47.0991 119.101 47.7292 120.174 47.9215C120.783 48.031 121.084 47.9939 121.084 47.9939C121.445 47.7204 121.66 47.0479 121.695 46.6067C121.725 46.2414 122.452 41.3614 122.667 40.3572C123.331 37.2457 124.231 29.2348 124.639 28.6559C124.796 27.1946 124.928 26.4568 125.037 26.4445C125.037 26.4445 125.951 22.6341 124.206 21.0898L124.208 21.0915Z" fill="currentColor"/>
      <path d="M113.924 32.4481C113.535 32.914 113.182 33.5812 112.867 34.4477L112.897 34.7266C112.975 34.7178 113.35 33.9783 114.024 32.5081L114.017 32.4375L113.924 32.4481Z" fill="currentColor"/>
      <path d="M147.801 7.91359C147.637 7.67886 141.502 8.28422 135.925 8.83663C136.116 5.65452 136.112 3.53487 135.915 2.48299C135.248 2.08589 134.772 1.91469 134.485 1.96764C134.237 1.66584 133.911 1.55289 133.508 1.62878C132.826 1.33581 132.148 1.25286 131.476 1.37993L131.088 1.54053L130.921 1.48406L130.534 1.64466C130.416 1.66761 130.456 2.76361 130.655 4.93267C130.636 6.52108 130.59 7.99477 130.525 9.35904C126.322 9.73497 123.108 9.64319 120.606 9.56907C120.557 9.52847 120.178 10.1444 120.181 10.891C120.183 11.6746 120.021 13.1095 120.303 13.706C120.395 13.7236 120.613 15.1956 120.683 15.478C121.928 15.5097 123.902 15.4691 125.457 15.3297L129.956 15.2397C129.993 15.222 130.042 15.2062 130.099 15.1885C130.016 15.9986 129.931 16.7381 129.847 17.3999L129.32 22.5305C129.4 22.9505 129.158 25.0525 128.597 28.8312C128.449 29.8036 128.382 30.3314 128.398 30.4161C128.067 31.9021 127.877 33.2523 127.825 34.4665L127.841 34.5512L128.067 34.3571C127.882 35.1319 127.801 35.5837 127.824 35.709C127.706 35.7319 126.72 43.5046 126.588 44.0093C126.688 44.267 126.41 45.8113 126.457 46.0637L126.561 46.196C126.461 46.2155 126.433 46.3513 126.48 46.6037L126.492 46.6673L126.568 46.6531L128.537 47.8533C129.447 47.8868 130.255 47.5956 130.255 47.5956C131.051 43.5822 132.173 38.1269 132.173 38.1269C132.305 37.7704 132.661 36.1149 133.224 32.248C133.902 28.8082 134.313 26.3127 134.457 24.7613C134.654 22.7493 134.836 21.6322 135.005 21.4115L135.08 21.3974L135.519 16.2174L135.48 16.0074L135.515 14.502C136.223 14.4437 136.827 14.4014 137.19 14.3802C137.958 14.3166 138.352 14.2072 138.377 14.0519L138.232 13.7007C138.759 13.4818 144.601 13.0636 145.147 12.5994L147.378 12.3029C147.47 11.9482 147.618 11.5652 147.926 10.6245C148.127 10.0121 147.907 8.05478 147.808 7.91359H147.801Z" fill="currentColor"/>
      <path d="M81.3806 40.8636C80.9703 40.8565 74.1839 40.9836 74.1839 40.9836C73.3633 40.6094 73.3386 43.4244 73.4408 43.5974C73.3879 43.5974 73.3633 43.6203 73.3633 43.668V43.9257C73.3633 44.1445 73.4848 44.4181 73.7295 44.7463C74.6346 44.8399 77.5647 44.148 77.9821 44.2892H78.0595L78.1898 44.2186C78.4328 44.3598 79.2957 43.6486 80.1145 43.7739C80.4631 43.6645 80.8171 43.5568 81.2344 42.8085C81.2344 42.4961 83.1362 40.8953 81.3806 40.8636Z" fill="currentColor"/>
      <path d="M92.6231 18.6263H92.5456L92.3889 18.6969C92.3889 18.5416 92.3625 18.4234 92.3114 18.3457C91.6669 18.5328 90.4766 19.9306 89.6771 19.9306C89.1436 19.9306 88.4744 20.7071 88.4744 20.7071C88.3353 20.8007 88.205 20.8483 88.0835 20.8483V20.9895C88.0835 20.9895 88.0307 21.0831 87.9268 21.0372C87.6838 21.2401 85.8208 22.728 85.8208 22.728V22.938C85.1587 23.5627 83.3151 26.3478 83.0721 26.676C82.7586 27.2073 81.526 28.6139 81.2302 29.1134V29.2546C81.2302 29.2546 80.4818 30.1847 79.7158 31.7625L79.7933 31.9037C79.6366 31.9037 79.3302 32.3255 78.529 33.8556H78.3723V33.808C78.1381 33.1762 78.1751 33.3015 78.1381 33.1762C77.8423 31.0989 77.5429 29.0922 77.2823 26.4678C77.3351 26.4678 77.3351 26.2807 77.2823 26.1872H77.3598C77.0111 23.531 77.4461 21.8331 77.027 21.8331C76.9231 21.8808 76.8438 21.9037 76.7928 21.9037C76.6713 21.9037 76.2786 21.8808 76.0004 21.8331C75.9299 21.8331 75.2062 21.9496 74.9808 22.1844L74.5318 22.4403C74.5318 22.4403 74.0247 22.6132 74.1286 23.1286C74.0934 23.3474 74.0159 23.4569 73.8944 23.4569C73.8944 23.5345 73.5933 25.8977 73.5933 25.8977C73.5933 25.8977 73.5264 26.196 73.6126 26.5384L73.5352 26.8666C73.588 27.4755 73.6338 27.9997 73.6338 28.4374C73.5457 28.891 73.6338 29.6552 73.6338 29.7964C73.6338 29.9058 74.1321 34.9834 74.2377 35.2323L74.1603 35.3735C74.3698 36.6707 74.5177 36.9742 74.604 37.3025L74.5265 37.7014V37.772L74.7607 38.1232C74.7607 38.2167 74.7079 38.2644 74.604 38.2644C74.0793 39.1821 80.9819 38.6385 81.1316 38.2855C81.3904 37.6696 82.6512 36.2347 83.1038 35.3064C85.2784 30.8694 88.8724 25.0859 92.1441 20.4159C93.1531 19.057 92.6266 18.8081 92.6266 18.6369L92.6231 18.6263Z" fill="currentColor"/>
      <path d="M70.0331 22.3226C69.4925 22.0685 67.1875 22.9315 65.9989 22.7585C65.2118 22.9315 65.0903 25.42 64.2292 29.1986C62.861 34.2727 62.4032 39.1915 61.4805 43.8897C61.6143 43.9285 63.1762 43.9762 63.1762 43.9762C63.5918 43.8279 64.2961 44.0944 64.275 43.8173C64.275 43.8173 64.6483 44.0256 64.5902 44.1279C64.6624 44.2215 64.849 44.0979 64.8596 44.2268L64.9564 44.2197C65.1554 44.0573 65.4248 42.8096 65.6925 42.0048L65.5816 41.8406C66.0711 41.3959 67.6629 32.9296 67.9235 32.4849L68.0926 32.6331C68.2387 32.6226 68.3849 32.2837 68.531 31.6183C68.7652 30.39 68.7159 29.4034 69.1403 28.7327C69.1403 28.7327 70.6089 23.7504 70.7233 22.6615C70.4733 22.582 70.225 22.6968 70.0348 22.3191L70.0331 22.3226Z" fill="currentColor"/>
      <path d="M6.06637 44.7038C6.03995 44.7038 6.00826 44.7038 5.97656 44.7074C5.97656 44.684 5.97656 44.6643 5.98889 44.6445L6.0153 44.7002C6.03467 44.7002 6.05052 44.7002 6.06637 44.7038Z" fill="currentColor"/>
      <path d="M30.6803 2.22649L30.7419 2.19472C30.7067 2.12942 30.4813 2.09942 30.064 2.10648L29.7734 2.25826C29.8597 2.42416 30.1626 2.41357 30.6803 2.22649Z" fill="currentColor"/>
      <path d="M43.7964 1.05394C43.7629 0.988635 34.3457 1.95757 34.1521 2.05816L34.101 1.95933L34.3915 1.80755L34.3017 1.63282C32.194 1.87109 31.0564 2.03346 30.8909 2.11994L30.8293 2.1517L30.868 2.22583C31.5301 2.11288 31.9791 2.09876 32.2168 2.18347L32.3225 2.03346C32.9388 2.07052 33.3913 2.01228 33.6819 1.8605L33.7717 2.03522C31.8946 2.27878 30.7624 2.50115 30.375 2.70412C29.9101 2.5894 29.2322 2.61764 28.3376 2.78883L28.2478 2.61411L28.3095 2.58234L29.4857 2.41114L29.5685 2.36702L29.4787 2.1923L16.7035 3.93778C7.98717 5.37618 5.50961 5.96389 3.81213 6.56043C3.81213 6.56043 3.74521 7.20462 3.73289 7.9141C3.7593 7.96352 3.53215 8.52123 3.6061 9.57664C3.64132 10.5897 3.73113 11.2374 3.87728 11.5198C4.14493 11.6963 4.33511 11.8922 4.44604 12.1075C6.83379 11.3821 7.55047 11.2815 7.65436 11.4792C7.54343 11.5374 7.46067 11.6116 7.40256 11.7051L7.45362 11.8039C9.19513 11.4951 10.9542 10.9956 12.002 10.745C11.5107 12.0263 10.9754 13.4841 10.3925 15.1184L9.65472 16.8251L9.53146 16.9998L8.4538 19.9807C8.31293 19.9913 8.16854 20.0037 8.01886 20.016C3.31204 20.3972 0.077305 20.196 0.0544136 20.7114C-0.000173598 21.0997 -0.0160215 21.3662 0.00510904 21.5109C0.0984356 22.1374 0.263958 22.0933 0.239306 22.9864C0.212893 23.8794 0.478785 24.8607 0.538655 25.5984C0.640786 25.699 0.721786 25.7449 0.781656 25.7361C2.17979 25.7467 4.63974 25.9196 6.3249 25.669L6.77392 25.6514C6.27912 27.148 5.66105 29.4371 4.91796 32.5221C3.81389 36.2708 3.44586 37.9227 3.41769 38.3022L2.26784 43.2174C2.21501 43.5474 2.16571 43.5792 2.12873 43.8792C2.12521 43.941 2.12168 43.9957 2.12168 44.0504C2.12168 44.6593 2.22381 44.9629 2.42632 44.9629C2.59536 45.8401 2.5848 46.2742 2.88062 46.2742C2.88062 46.4807 2.89823 46.8443 3.42649 47.3773H3.93891L4.37561 47.7409C4.43548 47.8009 4.98487 48.1256 5.03065 47.6561C5.03065 47.6526 5.03418 47.6526 5.03418 47.6491C5.16272 47.6685 5.25957 47.6297 5.26309 47.4814C5.7984 46.1895 6.14529 45.3106 6.31433 44.8535C6.31433 44.8499 6.31786 44.8464 6.31786 44.8411C6.3742 44.6823 6.44288 44.564 6.45696 44.5058C6.45696 44.5023 6.49218 44.3858 6.49218 44.3858L10.0668 32.8839C10.1161 32.8133 10.2763 32.3068 10.5475 31.3626C11.6163 27.6933 12.2749 25.6849 12.5214 25.3354L12.5249 25.3266C13.7259 25.219 15.198 25.0636 16.7616 24.8395L16.8162 24.8307L16.8021 24.7336C16.3302 24.6383 16.3003 24.7071 16.1788 24.7248L16.1541 24.5554C17.4625 24.5254 17.8604 24.4018 17.8851 24.3983L17.9837 24.31C18.357 24.3206 18.5947 24.3418 18.6986 24.3771C18.762 24.3012 18.8359 24.2571 18.9205 24.2447C18.9328 24.243 19.0103 24.2641 19.1529 24.3083L19.2656 24.1918L19.3889 24.273L19.4839 24.16C19.5104 24.1688 19.5244 24.1759 19.5332 24.1812C19.5544 24.16 19.6917 24.1141 20.2887 24.0576C20.2622 23.8794 20.3468 23.777 20.5405 23.7488C20.5405 23.7488 21.5089 20.8102 21.4966 20.7308C21.4984 20.6637 21.1621 19.0083 21.1621 19.0083C21.0599 18.9006 18.637 19.1653 16.707 19.2677L16.7176 19.3401C15.8125 19.4354 15.1117 19.5024 14.5007 19.5536C15.4392 17.0404 17.1983 13.6553 19.0719 9.51134C21.6005 9.09129 24.2823 8.66066 27.1244 8.21943L32.9599 7.47641C34.1961 7.41993 35.6664 7.27345 37.3709 7.03518C37.4678 6.984 37.6245 6.82869 37.8129 7.02459C37.8675 6.99636 37.9274 6.92223 37.989 6.80575C38.4697 6.68044 38.7427 6.68573 38.8131 6.8181C38.8554 6.79692 38.9064 6.72633 38.9681 6.60984C39.0508 6.56572 39.3255 6.57102 39.7921 6.6222C39.8467 6.59396 39.9101 6.52866 39.9823 6.42806L43.7981 5.91977L44.2296 3.18417V1.3928C44.1802 1.29396 43.696 1.10512 43.7929 1.05394H43.7964Z" fill="currentColor"/>
      <path d="M19.5384 24.1875C19.523 24.2028 19.569 24.2045 19.5384 24.1875V24.1875Z" fill="currentColor"/>
      <path d="M33.1924 23.9175C32.9758 23.1003 31.4227 22.525 28.5331 22.1914L26.0151 22.495L25.5889 22.6291C24.8934 22.8479 23.9777 23.058 23.055 23.9122C22.6782 24.221 22.3278 24.5599 22.0003 24.9164C21.5636 25.3788 21.1691 25.8783 20.794 26.3901C20.419 26.9019 20.0422 27.4085 19.6829 27.9362L19.6865 27.9309C19.5227 28.1285 19.3783 28.3474 19.2603 28.5733L19.1723 28.7392C19.1441 28.7904 19.1107 28.8416 19.0754 28.8963C19.0068 29.0039 18.9398 29.1116 18.8747 29.2228C18.7409 29.4416 18.6352 29.6816 18.5525 29.9217C18.4662 30.1617 18.394 30.4053 18.3235 30.6506L18.3394 30.6559C18.4433 30.4247 18.5436 30.1899 18.6423 29.9587C18.7444 29.7275 18.8588 29.5069 18.9909 29.2951C19.0578 29.1892 19.1283 29.0833 19.1987 28.9792C19.2322 28.928 19.2727 28.8751 19.3043 28.8151L19.3924 28.6439C19.5051 28.4197 19.6248 28.2009 19.7692 27.9962L19.7727 27.9926C20.0774 27.4402 20.4507 26.9266 20.8522 26.4378C20.949 26.323 21.0494 26.2118 21.148 26.0989C20.4947 27.0096 19.8696 27.9715 19.8696 27.9715C19.7551 28.3315 19.7076 28.388 19.5632 28.5556C18.9786 29.3551 18.4556 30.7847 18.4556 30.7847C17.5593 33.335 16.4588 37.1895 16.8039 39.7857C16.7986 39.7628 16.7916 39.7416 16.7881 39.7186C16.7616 39.5827 16.7405 39.4451 16.7299 39.3074C16.6789 38.755 16.6437 38.2044 16.6067 37.6502H16.5979C16.5627 37.9273 16.5591 38.2079 16.5767 38.485C16.5908 38.7638 16.6296 39.0409 16.6842 39.3145C16.7423 39.5863 16.7792 39.8616 16.8268 40.1369C16.8814 40.4105 16.9712 40.677 17.0856 40.9311H17.0892L17.4431 41.0441C17.4572 41.0988 17.4484 41.1835 17.4132 41.2965C17.7248 42.4683 19.8819 43.9014 21.6146 44.318C23.8809 44.2562 24.0622 44.3356 24.6609 44.1485C27.6386 43.2467 27.8164 42.6748 28.8008 42.3466C30.1566 40.8623 29.9946 39.6286 30.1742 39.5739C30.1602 39.5192 30.1091 39.4539 30.0246 39.378C30.0105 39.3233 30.1267 39.0656 30.3767 38.6032C30.3556 38.522 30.412 37.7031 30.1214 37.7066L27.9608 39.4786C27.3498 40.1457 26.5204 40.2393 26.0749 40.5234C25.2403 41.0547 24.4584 40.3752 23.4741 39.9428C22.8772 39.6798 22.7645 39.2351 22.5144 38.785C21.4156 36.8065 22.3542 35.0522 23.1202 32.6626L23.4336 32.5637C25.3618 32.8143 26.9835 32.7332 28.2989 32.3202L28.5454 32.2425C30.0246 31.7783 31.3505 30.9294 32.5461 29.0922C33.7576 26.7043 33.6326 25.5835 33.1906 23.921L33.1924 23.9175ZM27.871 28.0315C26.7282 30.1317 25.5713 31.1942 24.6592 31.4801C24.3017 31.4748 23.5252 31.533 23.5252 31.533C23.5357 31.2048 23.8509 30.7247 24.4937 29.4893L25.5255 27.6149C26.6613 25.8571 27.1209 25.5641 27.9238 24.927L27.9908 24.9058C28.2655 25.9418 28.5648 26.3795 27.871 28.0297V28.0315Z" fill="currentColor"/>
      <path d="M104.19 23.3155C103.863 22.9343 103.238 22.6113 102.287 22.4436C101.482 22.2671 100.656 22.1718 99.8304 22.1948L99.6297 22.2001L99.4307 22.2213L99.0328 22.2654C98.9007 22.276 98.7686 22.3024 98.6383 22.3289L98.2456 22.3995C98.1136 22.4172 97.9885 22.4666 97.8582 22.493L97.4709 22.5884C97.2208 22.6766 96.9637 22.749 96.7137 22.8443C95.7153 23.2272 94.8102 23.8308 94.009 24.535C93.7343 24.7804 93.4754 25.0416 93.2219 25.3081C92.3995 26.0811 91.5437 27.05 90.9486 28.0913C89.3532 30.4898 88.4675 34.445 88.4675 34.445C88.2192 35.3274 88.4763 38.9807 88.4763 38.9807C87.9551 39.489 89.5786 42.214 89.5557 42.3252C90.047 43.2818 90.7179 43.7001 91.5684 43.9225C92.4242 44.3372 95.4423 44.4413 97.1081 43.6948C98.7528 43.0347 98.5591 42.7488 99.1877 42.4258C100.04 41.7605 100.35 41.1145 100.804 40.4862C101.23 39.069 101.538 38.3118 101.729 38.2148C101.706 38.1707 101.642 38.1248 101.54 38.0806C101.517 38.0365 101.612 37.7753 101.826 37.3006C101.792 37.2335 101.318 36.7464 101.318 36.7464C101.278 36.6687 100.7 36.8364 100.383 36.9158L98.9887 38.5007C97.4709 40.4668 95.0039 41.0616 94.7873 40.638L94.7274 40.5215C93.9738 39.0531 93.5265 37.5335 93.7924 34.1732L94.1234 34.002C96.2647 33.7143 98.3707 33.7302 99.7565 33.0171L100.015 32.883C101.574 32.08 102.887 30.7051 103.958 28.7602C104.976 26.3211 105.183 24.475 104.189 23.3173L104.19 23.3155ZM98.9711 28.1619C98.5045 30.3257 96.4196 32.0359 95.4599 32.53C95.0673 32.62 94.8172 32.6924 94.7063 32.7489C94.7292 32.793 94.0917 33.0648 94.0917 33.0648C94.06 32.7718 94.3171 31.9917 94.8612 30.7263C94.8612 30.7263 97.4198 25.864 98.2157 25.0874L98.2861 25.0504C98.515 25.894 99.1736 27.2177 98.9694 28.1601L98.9711 28.1619Z" fill="currentColor"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   DATA & CONSTANTS
   ───────────────────────────────────────────── */

const IMG = '/blocks/festivent/images'

const NAV_ITEMS = [
  { label: 'PROGRAMMATION', href: '#artists' },
  { label: 'MON HORAIRE', href: '#schedule' },
  { label: 'BILLETTERIE', href: '#tickets' },
]

const ARTISTS = [
  { name: 'Artiste 2026', img: `${IMG}/artiste-placeholder.jpg`, bg: '#1a5d96' },
  { name: 'Salebarbes', img: `${IMG}/salebarbes.jpg`, bg: '#f15c56' },
  { name: 'Papa Roach', img: `${IMG}/papa-roach.jpg`, bg: '#f89e5d' },
  { name: 'Artiste 2026', img: `${IMG}/artiste-placeholder-hq.jpg`, bg: '#154e85' },
  { name: 'The Offspring', img: `${IMG}/the-offspring.jpg`, bg: '#f15c56' },
  // duplicated for infinite marquee
  { name: 'Artiste 2026', img: `${IMG}/artiste-placeholder.jpg`, bg: '#1a5d96' },
  { name: 'Salebarbes', img: `${IMG}/salebarbes.jpg`, bg: '#f15c56' },
  { name: 'Papa Roach', img: `${IMG}/papa-roach.jpg`, bg: '#f89e5d' },
  { name: 'Artiste 2026', img: `${IMG}/artiste-placeholder-hq.jpg`, bg: '#154e85' },
  { name: 'The Offspring', img: `${IMG}/the-offspring.jpg`, bg: '#f15c56' },
]

const FOOTER_INFOS = [
  'Infos festivaliers',
  'Infos b\u00e9n\u00e9voles',
  'Lieux et sc\u00e8nes',
  'Foire aux questions',
  'Contacte-nous',
]

const FOOTER_FESTIVENT = [
  '\u00c0 propos',
  '\u00c9ditions pr\u00e9c\u00e9dentes',
  'Zones exp\u00e9rience',
  'Festivent engag\u00e9',
  'Partenaires',
]

const SOCIALS = [
  { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { name: 'TikTok', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
]

const MARQUEE_TEXT = 'SALEBARBES, PAPA ROACH & THE OFFSPRING \u2014 EN SAVOIR PLUS!'

/* ─────────────────────────────────────────────
   TYPOGRAPHY SCALE (exact original CSS values)
   ───────────────────────────────────────────── */

const TYPO = {
  displayLarge: 'max(64px, min(1.88732rem + 9.01409vw, 10rem))',       // hero logo
  displayMedium: 'max(40px, min(1.44366rem + 4.50704vw, 5.5rem))',     // section headings
  displaySmall: 'max(37px, min(1.71831rem + 2.53521vw, 4rem))',        // sub-headings
  headlineLarge: 'max(32px, min(1.64789rem + 1.50235vw, 3rem))',       // card titles
  headlineMedium: 'max(22px, min(1.15493rem + 0.938967vw, 2rem))',     // h4 style overlines
  headlineSmall: 'max(20px, min(1.16197rem + 0.375587vw, 1.5rem))',    // artist names
  titleLarge: 'max(18px, min(1.03697rem + 0.375587vw, 1.375rem))',     // h6
  titleSmall: 'max(13px, min(0.768486rem + 0.187793vw, 0.9375rem))',   // marquee text, labels
  labelLarge: 'max(24px, min(1.32394rem + 0.751174vw, 2rem))',         // jumbo button text
  bodyMedium: 'max(16px, min(0.977993rem + 0.0938967vw, 1.0625rem))',  // paragraphs
  bodySmall: 'max(13px, min(0.768486rem + 0.187793vw, 0.9375rem))',    // small text
} as const

const JUMBO_HEIGHT = 'max(72px, min(2.91549rem + 6.76056vw, 9rem))'

/* ─────────────────────────────────────────────
   KEYFRAME ANIMATIONS (injected via <style>)
   ───────────────────────────────────────────── */

const KEYFRAMES = `
  /* Marquees */
  @keyframes fv-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fv-marquee-artists {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fv-marquee-partners {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Hero balloon fly animations (exact original keyframes) */
  @keyframes fv-hero-fly-1 {
    0% { bottom: 0; right: 0; transform: rotate(-4deg) translate(100%, 100%); }
    50% { bottom: 100%; right: 20%; transform: rotate(-4deg) translate(0, 0); }
    100% { bottom: 100%; right: 20%; transform: rotate(-4deg) translate(0, 0); }
  }
  @keyframes fv-hero-fly-2 {
    0% { bottom: 0; left: 0; transform: rotate(1deg) translate(-25%, 100%); }
    10% { bottom: 0; left: 0; transform: rotate(1deg) translate(-25%, 100%); }
    60% { bottom: 100%; left: 0; transform: rotate(1deg) translate(-20%, 0); }
    100% { bottom: 100%; left: 0; transform: rotate(1deg) translate(-20%, 0); }
  }
  @keyframes fv-hero-fly-3 {
    0% { bottom: 0; left: 0; transform: translate(-35%, 100%) rotate(1deg); }
    50% { bottom: 0; left: 0; transform: translate(-35%, 100%) rotate(1deg); }
    100% { bottom: 100%; left: 0; transform: translate(-35%, 0) rotate(1deg); }
  }
  @keyframes fv-hero-fly-4 {
    0% { bottom: 0; left: 45%; transform: translateY(100%) rotate(4deg); }
    30% { bottom: 0; left: 45%; transform: translateY(100%) rotate(4deg); }
    80% { bottom: 100%; left: 45%; transform: translateY(0) rotate(4deg); }
    100% { bottom: 100%; left: 45%; transform: translateY(0) rotate(4deg); }
  }

  /* Artist cards float */
  @keyframes artists-float {
    0% { transform: translateY(0); }
    100% { transform: translateY(-1rem); }
  }

  /* Ferris wheel spin (exact original) */
  @keyframes fv-footer-spin {
    0% { transform: translate(-50%, 7.5%) rotate(0deg); }
    100% { transform: translate(-50%, 7.5%) rotate(360deg); }
  }

  /* Section shape fly */
  @keyframes section-fly {
    0% { transform: translate(0); }
    100% { transform: translate(-60rem, -60rem); }
  }

  /* Legacy float (kept for blur decos) */
  @keyframes fv-float-1 {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes fv-float-2 {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-1.5deg); }
  }
  @keyframes fv-float-3 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-25px); }
  }
  @keyframes fv-pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  /* Media card hover rotations */
  .fv-media-card {
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .fv-media-card:hover {
    transform: rotate(-1deg) !important;
  }
  .fv-media-text-card:nth-child(odd) {
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .fv-media-text-card:nth-child(odd):hover {
    transform: rotate(-2deg) !important;
  }
  .fv-media-text-card:nth-child(even) {
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .fv-media-text-card:nth-child(even):hover {
    transform: rotate(2deg) !important;
  }

  /* Footer nav link hover rotations */
  .fv-footer-link:nth-child(odd):hover {
    transform: rotate(-2deg);
  }
  .fv-footer-link:nth-child(even):hover {
    transform: rotate(2deg);
  }
  .fv-footer-link {
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s;
  }

  /* Accordion smooth transition */
  .fv-accordion-content {
    transition: height 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
  }

  /* Button label transition */
  .fv-btn-label {
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* GPU-accelerated marquee wrappers */
  .fv-marquee-wrapper {
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  /* Artist card float animation */
  .fv-artist-card {
    animation: artists-float 8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate-reverse;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .fv-desktop-nav { display: none !important; }
    .fv-burger { display: flex !important; }
    .fv-hero-sponsors { flex-direction: column !important; gap: 1.5rem !important; }
    .fv-activities-grid { grid-template-columns: 1fr !important; }
    .fv-visit-grid { flex-direction: column !important; }
    .fv-footer-grid { grid-template-columns: 1fr !important; }
    .fv-social-floating { display: none !important; }
    .fv-sky-gallery-photos { display: none !important; }
    .fv-two-scenes-img { transform: rotate(0deg) !important; }
  }
  @media (min-width: 769px) {
    .fv-burger { display: none !important; }
  }

  /* Scrollbar styling */
  .fv-page::-webkit-scrollbar { width: 8px; }
  .fv-page::-webkit-scrollbar-track { background: #0f3356; }
  .fv-page::-webkit-scrollbar-thumb { background: #f15c56; border-radius: 4px; }

  /* Smooth scroll */
  .fv-page {
    scroll-behavior: smooth;
  }
`

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */

export default function FestiventFullPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [curtainVisible, setCurtainVisible] = useState(true)
  const lastScroll = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Curtain entrance animation
      const tl = gsap.timeline()
      tl.to('.fv-curtain-sky', { y: '-100%', duration: 1.2, ease: 'power3.inOut', delay: 0.3 })
      tl.to('.fv-curtain', { opacity: 0, duration: 0.4, ease: 'power2.out', onComplete: () => setCurtainVisible(false) })
      // Hero entrance animations chained after curtain
      tl.fromTo('.fv-hero-badge-line1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, rotate: -6, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      tl.fromTo('.fv-hero-badge-line2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, rotate: 2, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      tl.fromTo('.fv-hero-logo', { opacity: 0, scale: 0.85, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.6')
      tl.fromTo('.fv-hero-sponsors', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      tl.fromTo('.fv-hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')

      // Blur decorations float
      document.querySelectorAll('.fv-blur-deco').forEach((el, i) => {
        gsap.to(el, {
          y: `${(i % 2 === 0 ? -1 : 1) * (12 + i * 4)}`,
          x: `${(i % 3 === 0 ? 1 : -1) * (6 + i * 2)}`,
          duration: 4 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Section reveals on scroll
      document.querySelectorAll('.fv-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })

      // Gallery parallax in sky section
      document.querySelectorAll('.fv-parallax-img').forEach((el, i) => {
        gsap.to(el, {
          yPercent: -(10 + i * 5),
          ease: 'none',
          scrollTrigger: {
            trigger: '.fv-sky-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // Video parallax effect (GSAP y: -200 on .fv-video-inner)
      const videoInner = document.querySelector('.fv-video-inner')
      if (videoInner) {
        gsap.to(videoInner, {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: '.fv-video-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // CTA venue image parallax (section 7)
      const venueImg = document.querySelector('.fv-two-scenes-img')
      if (venueImg) {
        gsap.to(venueImg, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: venueImg,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, containerRef)

    // Header hide on scroll down, show on scroll up
    const handleScroll = () => {
      const st = window.scrollY
      const header = headerRef.current
      if (!header) return
      if (st > 120 && st > lastScroll.current) {
        header.style.transform = 'translateY(-100%)'
        header.style.opacity = '0'
      } else {
        header.style.transform = 'translateY(0)'
        header.style.opacity = '1'
      }
      lastScroll.current = st
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="fv-page" style={{
      fontFamily: "'Metro Sans', sans-serif",
      color: '#154e85',
      background: '#fef7de',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased',
      lineHeight: 1.5,
      position: 'relative',
    }}>
      <style>{KEYFRAMES}</style>

      {/* ═══════════════════════════════════════
          LOADING CURTAIN
          ═══════════════════════════════════════ */}
      {curtainVisible && (
        <div className="fv-curtain" style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: '#f89e5d',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img className="fv-curtain-sky" src={`${IMG}/sky.png`} alt="" style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
          }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <FestiventLogoSVG width={300} color="#fff" />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          1. MARQUEE TICKER BAR
          ═══════════════════════════════════════ */}
      <div style={{
        background: '#f15c56',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '8px 0',
        position: 'relative',
        zIndex: 110,
      }}>
        <div className="fv-marquee-wrapper" style={{
          display: 'inline-flex',
          animation: 'fv-marquee 15s linear infinite',
        }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} style={{
              color: '#fff',
              fontFamily: "'futura-pt-condensed', sans-serif",
              fontWeight: 800,
              fontSize: TYPO.titleSmall,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              paddingRight: '3rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              {MARQUEE_TEXT}
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#fef7de', opacity: 0.6 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          2. HEADER
          ═══════════════════════════════════════ */}
      <header ref={headerRef} style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(15,51,86,0.95)',
        backdropFilter: 'blur(12px)',
        transition: 'transform 0.5s ease, opacity 0.5s ease',
        padding: '0 clamp(1.5rem, 3vw, 3rem)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <FestiventLogoSVG width={120} color="#fef7de" />
        </a>

        {/* Desktop nav */}
        <nav className="fv-desktop-nav" style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
        }}>
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href} style={{
              textDecoration: 'none',
              color: '#fef7de',
              fontWeight: 700,
              fontSize: TYPO.bodySmall,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              padding: '0.45rem 1.1rem',
              border: '1.5px solid rgba(254,247,222,0.4)',
              borderRadius: '100px',
              transition: 'all 0.25s',
              fontFamily: "'Metro Sans', sans-serif",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fef7de'; e.currentTarget.style.color = '#0f3356' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fef7de' }}
            >{item.label}</a>
          ))}
          {/* Hamburger icon */}
          <button style={{
            background: 'none',
            border: '1.5px solid rgba(254,247,222,0.4)',
            borderRadius: '100px',
            padding: '0.45rem 0.7rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            alignItems: 'center',
            justifyContent: 'center',
          }} onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ width: 18, height: 2, background: '#fef7de', display: 'block', borderRadius: 1 }} />
            <span style={{ width: 18, height: 2, background: '#fef7de', display: 'block', borderRadius: 1 }} />
            <span style={{ width: 18, height: 2, background: '#fef7de', display: 'block', borderRadius: 1 }} />
          </button>
        </nav>

        {/* Mobile burger */}
        <button className="fv-burger" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexDirection: 'column',
          gap: '5px',
          padding: '8px',
        }}>
          <span style={{ width: 24, height: 2.5, background: '#fef7de', display: 'block', borderRadius: 2, transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7.5px)' : 'none' }} />
          <span style={{ width: 24, height: 2.5, background: '#fef7de', display: 'block', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ width: 24, height: 2.5, background: '#fef7de', display: 'block', borderRadius: 2, transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7.5px)' : 'none' }} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: '#0f3356',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
        }}>
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
              textDecoration: 'none',
              color: '#fef7de',
              fontSize: TYPO.headlineLarge,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>{item.label}</a>
          ))}
          <a href="#tickets" onClick={() => setMenuOpen(false)} style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.75rem 2rem',
            border: '2px solid #fef7de',
            borderRadius: '100px',
            color: '#fef7de',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: TYPO.titleLarge,
            textTransform: 'uppercase',
            marginTop: '1rem',
          }}>J&apos;ach&egrave;te mon billet!</a>
        </div>
      )}

      {/* ═══════════════════════════════════════
          3. HERO SECTION
          ═══════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem 6rem',
        background: 'linear-gradient(180deg, #f7826e 0%, #e8685e 20%, #c76a7a 40%, #7a88b8 60%, #5a9fd4 80%, #c7eafb 100%)',
      }}>
        {/* Blur decorations — exact positions from original */}
        <img className="fv-blur-deco" src={`${IMG}/blue-blur-alt.png`} alt="" style={{
          position: 'absolute', width: 1000, top: -420, right: 0,
          pointerEvents: 'none', zIndex: 10, mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', width: 2500, top: -540, left: -1400,
          transform: 'rotate(-18deg)', pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', width: 2000, top: 600,
          transform: 'rotate(-2deg) translate(-49%)', pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', width: 2600, top: 400,
          transform: 'rotate(-15deg) translate(-50%)', pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', width: 4600, opacity: 0.16,
          transform: 'rotate(-15deg) translate(-50%, -50%)', pointerEvents: 'none', mixBlendMode: 'screen',
        }} />

        {/* Montgolfieres — exact original keyframes */}
        <img src={`${IMG}/montgolfiere.png`} alt="" style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 632, pointerEvents: 'none', zIndex: 1,
          animation: 'fv-hero-fly-1 20s linear infinite',
        }} />
        <img src={`${IMG}/montgolfiere-blur.png`} alt="" style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 1000, pointerEvents: 'none',
          animation: 'fv-hero-fly-2 20s linear infinite',
        }} />
        <img src={`${IMG}/montgolfiere.png`} alt="" style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 1100, pointerEvents: 'none',
          animation: 'fv-hero-fly-3 20s linear infinite',
        }} />
        <img src={`${IMG}/montgolfiere-blur.png`} alt="" style={{
          position: 'absolute', bottom: 0, left: '45%',
          width: 376, pointerEvents: 'none',
          filter: 'blur(20px)',
          animation: 'fv-hero-fly-4 20s linear infinite',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100 }}>
          {/* Date badge — two lines with separate rotations (exact original) */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="fv-hero-badge-line1" style={{
              fontFamily: "'futura-pt-condensed', sans-serif",
              fontWeight: 800,
              fontSize: TYPO.headlineMedium,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: '#fff',
              transform: 'rotate(-6deg)',
              zIndex: 10,
              position: 'relative',
              opacity: 0,
            }}>
              Du 29 juillet
            </div>
            <div className="fv-hero-badge-line2" style={{
              fontFamily: "'futura-pt-condensed', sans-serif",
              fontWeight: 800,
              fontSize: TYPO.headlineMedium,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: '#fff',
              transform: 'rotate(2deg) translate(-10%)',
              marginTop: '1.4em',
              marginLeft: '-0.8em',
              opacity: 0,
            }}>
              au 2 ao&ucirc;t 2026
            </div>
          </div>

          {/* Large Festivent SVG logo — 80vw width, centered, white */}
          <div className="fv-hero-logo" style={{ opacity: 0, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80vw', maxWidth: 1100 }}>
              <FestiventLogoSVG width={1100} color="#fff" />
            </div>
          </div>

          {/* Sponsors */}
          <div className="fv-hero-sponsors" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '2rem',
            opacity: 0,
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{
                fontFamily: "'futura-pt-condensed', sans-serif",
                fontWeight: 800,
                fontSize: TYPO.bodySmall,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.7)',
                display: 'block',
                marginBottom: '0.4rem',
              }}>PARTENAIRE EN TITRE</span>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '0.5rem 1.5rem',
                color: '#fff',
                fontWeight: 700,
                fontSize: TYPO.bodyMedium,
              }}>L&eacute;vis</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{
                fontFamily: "'futura-pt-condensed', sans-serif",
                fontWeight: 800,
                fontSize: TYPO.bodySmall,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.7)',
                display: 'block',
                marginBottom: '0.4rem',
              }}>PR&Eacute;SENT&Eacute; PAR</span>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '0.5rem 1.5rem',
                color: '#fff',
                fontWeight: 700,
                fontSize: TYPO.bodyMedium,
              }}>Loto-Qu&eacute;bec</div>
            </div>
          </div>

          {/* Jumbo CTA button — exact original sizing */}
          <div className="fv-hero-cta" style={{ marginTop: '2.5rem', opacity: 0 }}>
            <a href="#tickets" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              height: JUMBO_HEIGHT,
              borderRadius: `calc(0.5 * ${JUMBO_HEIGHT})`,
              padding: '0 4rem',
              border: '2px solid #fff',
              color: '#fff',
              fontWeight: 700,
              fontSize: TYPO.labelLarge,
              textDecoration: 'none',
              textTransform: 'uppercase',
              fontFamily: "'Metro Sans', sans-serif",
              letterSpacing: '0.02em',
              transition: 'all 0.3s',
              background: 'transparent',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#f15c56' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
            >
              <span className="fv-btn-label">J&apos;ach&egrave;te mon billet!</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. VIDEO / CONCERT ARCH SECTION
          ═══════════════════════════════════════ */}
      <section className="fv-video-section" style={{
        background: '#fef7de',
        padding: '0',
        marginTop: '-1px',
        position: 'relative',
      }}>
        <div className="fv-video-inner" style={{
          clipPath: 'circle(28800px at 50% 28891px)',
          overflow: 'visible',
          position: 'relative',
          width: '100%',
          height: '56.25vw',
          maxHeight: 900,
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source src="https://festivent.ca/wp-content/uploads/2025/11/siteweb_2025_v09.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. ARTISTS SECTION
          ═══════════════════════════════════════ */}
      <section id="artists" style={{
        padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(4rem, 8vw, 6rem)',
        background: '#fef7de',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background blurs */}
        <img className="fv-blur-deco" src={`${IMG}/blue-blur.png`} alt="" style={{
          position: 'absolute', top: '10%', right: '-5%', width: '30%', maxWidth: 350,
          opacity: 0.25, pointerEvents: 'none',
        }} />
        <img src={`${IMG}/montgolifiere-blue.png`} alt="" style={{
          position: 'absolute', bottom: '5%', left: '2%', width: 'clamp(60px, 8vw, 120px)',
          opacity: 0.2, pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(1rem, 3vw, 3rem)', position: 'relative', zIndex: 1 }}>
          {/* Overline badge — futura-pt-condensed weight 800 */}
          <div className="fv-reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.4rem 1.2rem',
              background: '#fef7de',
              border: '1.5px solid #f15c56',
              borderRadius: '100px',
              color: '#f15c56',
              fontFamily: "'futura-pt-condensed', sans-serif",
              fontWeight: 800,
              fontSize: TYPO.titleSmall,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}>
              PROG COMPL&Egrave;TE - &Agrave; VENIR!
            </span>
          </div>

          {/* Heading — display-medium */}
          <h2 className="fv-reveal" style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displayMedium,
            color: '#154e85',
            textAlign: 'center',
            marginBottom: '3rem',
            letterSpacing: '-0.01em',
          }}>
            PREMIERS ARTISTES 2026
          </h2>
        </div>

        {/* Marquee artist carousel — 30s smooth */}
        <div style={{ overflow: 'hidden', padding: '1rem 0' }}>
          <div className="fv-marquee-wrapper" style={{
            display: 'flex',
            gap: '1.5rem',
            animation: 'fv-marquee-artists 30s linear infinite',
            width: 'max-content',
          }}>
            {[...ARTISTS, ...ARTISTS].map((artist, i) => {
              const rotation = i % 2 === 0 ? -2 : 2.5
              const floatDelay = `${(i * 0.8) % 8}s`
              return (
                <div key={i} className="fv-artist-card" style={{
                  flex: '0 0 auto',
                  width: 'clamp(260px, 22vw, 335px)',
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                  animationDelay: floatDelay,
                }}>
                  <div style={{
                    background: artist.bg,
                    borderRadius: '20px',
                    padding: '8px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      borderRadius: '14px',
                      overflow: 'hidden',
                      aspectRatio: '3/4',
                    }}>
                      <img src={artist.img} alt={artist.name} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }} />
                    </div>
                  </div>
                  {/* Artist name — futura-pt-condensed weight 800 (headline-small) */}
                  <p style={{
                    fontFamily: "'futura-pt-condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: TYPO.headlineSmall,
                    textTransform: 'uppercase',
                    color: '#154e85',
                    textAlign: 'center',
                    marginTop: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}>{artist.name}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="fv-reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2.5rem',
            border: '2px solid #f15c56',
            borderRadius: '100px',
            color: '#f15c56',
            fontWeight: 700,
            fontSize: TYPO.titleLarge,
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontFamily: "'Metro Sans', sans-serif",
            transition: 'all 0.3s',
            background: 'transparent',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f15c56'; e.currentTarget.style.color = '#fef7de' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f15c56' }}
          >
            <span className="fv-btn-label">VOIR LA PROGRAMMATION</span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. SPOTIFY SECTION
          ═══════════════════════════════════════ */}
      <section style={{
        clipPath: 'circle(28800px at 50% 28891px)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 3vw, 3rem)',
        background: 'linear-gradient(180deg, #f89e5d 0%, #f17a5e 30%, #8a7db8 60%, #5a9fd4 85%, #c7eafb 100%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', top: '-10%', left: '-5%', width: '40%', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/blue-blur-alt.png`} alt="" style={{
          position: 'absolute', bottom: '-10%', right: '-8%', width: '35%', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen',
        }} />

        <div className="fv-reveal" style={{ maxWidth: 500, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Real Spotify embed iframe */}
          <iframe
            src="https://open.spotify.com/embed/playlist/4OJEEDvC7paQxTxDIbF6ON?utm_source=generator&theme=0"
            width="100%"
            height="400"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: '12px' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. "PROFITE DE 2 SCENES" SECTION
          ═══════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 3vw, 3rem)',
        background: '#c7eafb',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div className="fv-reveal" style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displaySmall,
            color: '#f15c56',
            marginBottom: '1.5rem',
          }}>
            PROFITE DE 2 SC&Egrave;NES C&Ocirc;TE &Agrave; C&Ocirc;TE
          </h2>
          <a href="#" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 2rem',
            border: '2px solid #154e85',
            borderRadius: '100px',
            color: '#154e85',
            fontWeight: 700,
            fontSize: TYPO.bodyMedium,
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontFamily: "'Metro Sans', sans-serif",
            transition: 'all 0.3s',
            background: 'transparent',
            marginBottom: '3rem',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#154e85'; e.currentTarget.style.color = '#c7eafb' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#154e85' }}
          >
            <span className="fv-btn-label">EN SAVOIR PLUS</span>
          </a>
        </div>
        <div className="fv-reveal" style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* CTA-S1 venue image — original styles */}
          <div className="fv-two-scenes-img" style={{
            transform: 'rotate(4deg) translateY(75%)',
            transformOrigin: '0 100%',
            aspectRatio: '1/1',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(21,78,133,0.15)',
          }}>
            <img src={`${IMG}/venue.jpg`} alt="2 sc&egrave;nes" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. "ACTIVITES POUR PETITS ET GRANDS"
          ═══════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 3vw, 3rem)',
        background: '#154e85',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Overline badge — futura-pt-condensed weight 800 */}
          <div className="fv-reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.4rem 1.2rem',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: '100px',
              color: '#fff',
              fontFamily: "'futura-pt-condensed', sans-serif",
              fontWeight: 800,
              fontSize: TYPO.titleSmall,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}>
              FAMILLE & MONTGOLFI&Egrave;RES
            </span>
          </div>

          {/* Heading — display-medium */}
          <h2 className="fv-reveal" style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displayMedium,
            color: '#fff',
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            ACTIVIT&Eacute;S POUR PETITS ET GRANDS
          </h2>

          {/* Two cards */}
          <div className="fv-activities-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}>
            {/* Card 1 - Famille */}
            <div className="fv-reveal fv-media-text-card" style={{
              background: '#1a5d96',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: 340,
            }}>
              <div style={{ overflow: 'hidden' }}>
                <img src={`${IMG}/famille.jpg`} alt="Programmation familiale" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                {/* Card title — headline-large, Metro Sans */}
                <h3 style={{
                  fontFamily: "'Metro Sans', sans-serif",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: TYPO.headlineLarge,
                  lineHeight: 1.1,
                  color: '#fff',
                  marginBottom: '0.75rem',
                }}>PROGRAMMATION FAMILIALE</h3>
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: TYPO.bodyMedium,
                  lineHeight: 1.5,
                  marginBottom: '1.25rem',
                  fontWeight: 400,
                }}>
                  Disco mousse, mascotte Rafale, spectacles, piscines &agrave; &eacute;claboussures, jeux gonflables et plus encore!
                </p>
                <a href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.5rem',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: TYPO.bodySmall,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontFamily: "'Metro Sans', sans-serif",
                  transition: 'all 0.3s',
                  alignSelf: 'flex-start',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#154e85' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
                >
                  <span className="fv-btn-label">VIENS T&apos;AMUSER</span>
                </a>
              </div>
            </div>

            {/* Card 2 - Aerienne */}
            <div className="fv-reveal fv-media-text-card" style={{
              background: '#1a5d96',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: 340,
            }}>
              <div style={{ overflow: 'hidden' }}>
                <img src={`${IMG}/montgolfieres-photo.jpg`} alt="Programmation a&eacute;rienne" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                {/* Card title — headline-large, Metro Sans */}
                <h3 style={{
                  fontFamily: "'Metro Sans', sans-serif",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: TYPO.headlineLarge,
                  lineHeight: 1.1,
                  color: '#fff',
                  marginBottom: '0.75rem',
                }}>PROGRAMMATION A&Eacute;RIENNE</h3>
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: TYPO.bodyMedium,
                  lineHeight: 1.5,
                  marginBottom: '1.25rem',
                  fontWeight: 400,
                }}>
                  Envol&eacute;es de montgolfi&egrave;res, formes sp&eacute;ciales, parachutistes, spectacles m&eacute;t&eacute;o-d&eacute;pendants.
                </p>
                <a href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.5rem',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: TYPO.bodySmall,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontFamily: "'Metro Sans', sans-serif",
                  transition: 'all 0.3s',
                  alignSelf: 'flex-start',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#154e85' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
                >
                  <span className="fv-btn-label">VIENS T&apos;ENVOLER</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          9. "ENTRE CIEL ET TERRE" (Sky section)
          ═══════════════════════════════════════ */}
      <section className="fv-sky-section" style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1rem, 3vw, 3rem)',
        backgroundImage: `url(${IMG}/sky.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.1)',
          pointerEvents: 'none',
        }} />

        {/* Floating gallery photos — aspect-ratio 454/568, border-radius 1rem, translateY(50%) initially */}
        <div className="fv-sky-gallery-photos" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <img className="fv-parallax-img" src={`${IMG}/gallery-1.jpg`} alt="" style={{
            position: 'absolute', top: '10%', left: '5%',
            width: 'clamp(120px, 14vw, 200px)', borderRadius: '1rem',
            aspectRatio: '454/568',
            objectFit: 'cover',
            transform: 'rotate(-6deg) translateY(50%)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }} />
          <img className="fv-parallax-img" src={`${IMG}/gallery-2.jpg`} alt="" style={{
            position: 'absolute', top: '15%', right: '6%',
            width: 'clamp(140px, 16vw, 220px)', borderRadius: '1rem',
            aspectRatio: '454/568',
            objectFit: 'cover',
            transform: 'rotate(4deg) translateY(50%)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }} />
          <img className="fv-parallax-img" src={`${IMG}/gallery-3.jpg`} alt="" style={{
            position: 'absolute', bottom: '12%', left: '8%',
            width: 'clamp(130px, 15vw, 210px)', borderRadius: '1rem',
            aspectRatio: '454/568',
            objectFit: 'cover',
            transform: 'rotate(3deg) translateY(50%)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }} />
          <img className="fv-parallax-img" src={`${IMG}/ambiance-1.jpg`} alt="" style={{
            position: 'absolute', bottom: '18%', right: '5%',
            width: 'clamp(110px, 13vw, 180px)', borderRadius: '1rem',
            aspectRatio: '454/568',
            objectFit: 'cover',
            transform: 'rotate(-4deg) translateY(50%)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }} />
        </div>

        <div className="fv-reveal" style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          {/* Overline — headline-medium, futura-pt-condensed weight 800 */}
          <p style={{
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.headlineMedium,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: 'rgba(254,247,222,0.8)',
            marginBottom: '0.5rem',
          }}>
            C&eacute;l&eacute;brer, se rassembler et &ecirc;tre &eacute;pat&eacute;
          </p>
          {/* Heading — display-large */}
          <h2 style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.05,
            fontSize: TYPO.displayLarge,
            color: '#fef7de',
            marginBottom: '1rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}>
            ENTRE CIEL ET TERRE
          </h2>
          <p style={{
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.headlineMedium,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: 'rgba(254,247,222,0.8)',
            marginBottom: '2rem',
          }}>
            Festivit&eacute;s pour petits et grands
          </p>
          <a href="#" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 2rem',
            border: '2px solid #fef7de',
            borderRadius: '100px',
            color: '#fef7de',
            fontWeight: 700,
            fontSize: TYPO.bodyMedium,
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontFamily: "'Metro Sans', sans-serif",
            transition: 'all 0.3s',
            background: 'transparent',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fef7de'; e.currentTarget.style.color = '#154e85' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fef7de' }}
          >
            <span className="fv-btn-label">D&Eacute;COUVRIR LE FESTIVENT</span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          10. "PREPARE TA VISITE" SECTION
          ═══════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 3vw, 3rem)',
        background: '#fef7de',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Heading — display-medium */}
          <h2 className="fv-reveal" style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displayMedium,
            color: '#f15c56',
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            PR&Eacute;PARE TA VISITE
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Card 1 - Infos festivaliers */}
            <div className="fv-reveal fv-visit-grid fv-media-card" style={{
              display: 'flex',
              background: '#fce8e0',
              border: '1.5px solid #f15c56',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              minHeight: 220,
              cursor: 'pointer',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(-1deg) translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(241,92,86,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(0deg) translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ flex: '0 0 40%', overflow: 'hidden' }}>
                <img src={`${IMG}/infos.jpg`} alt="Infos festivaliers" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                flex: 1,
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                {/* headline-large */}
                <h3 style={{
                  fontFamily: "'Metro Sans', sans-serif",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: TYPO.headlineLarge,
                  color: '#f15c56',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}>INFOS FESTIVALIERS</h3>
                <p style={{
                  color: '#154e85',
                  fontSize: TYPO.bodyMedium,
                  lineHeight: 1.5,
                  opacity: 0.7,
                  fontWeight: 400,
                }}>
                  Tout ce que tu dois savoir pour profiter au maximum de ton exp&eacute;rience au Festivent.
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '2rem',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f15c56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 2 - Zones experience */}
            <div className="fv-reveal fv-visit-grid fv-media-card" style={{
              display: 'flex',
              background: '#fce8e0',
              border: '1.5px solid #f15c56',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              minHeight: 220,
              cursor: 'pointer',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(-1deg) translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(241,92,86,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(0deg) translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ flex: '0 0 40%', overflow: 'hidden' }}>
                <img src={`${IMG}/zones.jpg`} alt="Zones exp&eacute;rience" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                flex: 1,
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <h3 style={{
                  fontFamily: "'Metro Sans', sans-serif",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: TYPO.headlineLarge,
                  color: '#f15c56',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}>ZONES EXP&Eacute;RIENCE</h3>
                <p style={{
                  color: '#154e85',
                  fontSize: TYPO.bodyMedium,
                  lineHeight: 1.5,
                  opacity: 0.7,
                  fontWeight: 400,
                }}>
                  D&eacute;couvre les diff&eacute;rentes zones du site et planifie ton parcours id&eacute;al.
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '2rem',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f15c56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          11. SOCIAL CTA SECTION
          ═══════════════════════════════════════ */}
      <section style={{
        clipPath: 'circle(28800px at 50% 28891px)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 3vw, 3rem)',
        background: 'linear-gradient(180deg, #f89e5d 0%, #f17a5e 40%, #a87cc0 70%, #7aa8d4 100%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <img className="fv-blur-deco" src={`${IMG}/red-blur.png`} alt="" style={{
          position: 'absolute', top: '-10%', right: '-8%', width: '40%', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/blue-blur-alt.png`} alt="" style={{
          position: 'absolute', bottom: '-10%', left: '-5%', width: '35%', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen',
        }} />

        {/* Floating ambiance photos (sides) */}
        <div className="fv-social-floating" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <img src={`${IMG}/ambiance-2.jpg`} alt="" style={{
            position: 'absolute', top: '15%', left: '4%',
            width: 'clamp(100px, 12vw, 180px)', borderRadius: '12px',
            transform: 'rotate(-8deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }} />
          <img src={`${IMG}/ambiance-3.jpg`} alt="" style={{
            position: 'absolute', bottom: '10%', left: '6%',
            width: 'clamp(90px, 10vw, 150px)', borderRadius: '12px',
            transform: 'rotate(5deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }} />
          <img src={`${IMG}/artist-photo.jpg`} alt="" style={{
            position: 'absolute', top: '20%', right: '4%',
            width: 'clamp(110px, 13vw, 190px)', borderRadius: '12px',
            transform: 'rotate(6deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }} />
          <img src={`${IMG}/ambiance-1.jpg`} alt="" style={{
            position: 'absolute', bottom: '15%', right: '5%',
            width: 'clamp(100px, 11vw, 160px)', borderRadius: '12px',
            transform: 'rotate(-5deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }} />
        </div>

        <div className="fv-reveal" style={{ position: 'relative', zIndex: 2, maxWidth: 650, margin: '0 auto' }}>
          {/* Overline badge — futura-pt-condensed weight 800 */}
          <span style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            border: '1.5px solid rgba(255,255,255,0.6)',
            borderRadius: '100px',
            color: '#fff',
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.titleSmall,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}>
            NE MANQUE RIEN!
          </span>

          {/* Heading — display-small */}
          <h2 style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displaySmall,
            color: '#154e85',
            marginBottom: '2.5rem',
          }}>
            POUR UN VENT DE FESTIVIT&Eacute;S AU QUOTIDIEN
          </h2>

          {/* Social icons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}>
            {SOCIALS.map(social => (
              <a key={social.name} href="#" style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: '2px solid #f15c56',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s',
                textDecoration: 'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f15c56' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#f15c56">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          12. FOOTER CTA (dark blue)
          ═══════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1rem, 3vw, 3rem)',
        background: '#0f3356',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Blur decorations */}
        <img className="fv-blur-deco" src={`${IMG}/orange-blur-alt.png`} alt="" style={{
          position: 'absolute', top: '10%', left: '-5%', width: '35%', opacity: 0.3, pointerEvents: 'none',
        }} />
        <img className="fv-blur-deco" src={`${IMG}/blue-blur-alt.png`} alt="" style={{
          position: 'absolute', bottom: '5%', right: '-8%', width: '30%', opacity: 0.2, pointerEvents: 'none',
        }} />
        {/* Ferris wheel with spin animation */}
        <img src={`${IMG}/ferris-wheel.png`} alt="" style={{
          position: 'absolute', bottom: '-5%', right: '5%',
          width: 'clamp(150px, 20vw, 300px)', opacity: 0.1, pointerEvents: 'none',
          animation: 'fv-footer-spin 40s linear infinite',
        }} />

        <div className="fv-reveal" style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          {/* Badge — futura-pt-condensed weight 800 */}
          <span style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            border: '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: '100px',
            color: '#fff',
            fontFamily: "'futura-pt-condensed', sans-serif",
            fontWeight: 800,
            fontSize: TYPO.titleSmall,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}>
            EN VENTE D&Egrave;S MAINTENANT!
          </span>

          {/* Heading — display-medium */}
          <h2 style={{
            fontFamily: "'Metro Sans', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            fontSize: TYPO.displayMedium,
            color: '#fff',
            marginBottom: '2.5rem',
          }}>
            REJOINS LA F&Ecirc;TE, PRENDS TON BILLET!
          </h2>

          {/* Jumbo CTA */}
          <a href="#" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            height: JUMBO_HEIGHT,
            borderRadius: `calc(0.5 * ${JUMBO_HEIGHT})`,
            padding: '0 4rem',
            border: '2px solid #fff',
            color: '#fff',
            fontWeight: 700,
            fontSize: TYPO.labelLarge,
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontFamily: "'Metro Sans', sans-serif",
            transition: 'all 0.3s',
            background: 'transparent',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0f3356' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
          >
            <span className="fv-btn-label">BILLETTERIE</span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          13. FOOTER
          ═══════════════════════════════════════ */}
      <footer style={{
        clipPath: 'circle(28800px at 50% 28891px)',
        background: '#0f3356',
        padding: '0 clamp(1rem, 3vw, 3rem) 0',
      }}>
        {/* Cream card */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          background: '#fef7de',
          borderRadius: '1.5rem',
          padding: 'clamp(2rem, 4vw, 3.5rem)',
        }}>
          <div className="fv-footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr 1fr',
            gap: '3rem',
          }}>
            {/* Left column */}
            <div>
              {/* headline-large */}
              <h3 style={{
                fontFamily: "'Metro Sans', sans-serif",
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: TYPO.headlineLarge,
                color: '#154e85',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}>
                POUR TOUT SAVOIR SUR LE FESTIVAL
              </h3>
              <a href="#" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                background: '#f15c56',
                borderRadius: '100px',
                color: '#fff',
                fontWeight: 700,
                fontSize: TYPO.bodySmall,
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontFamily: "'Metro Sans', sans-serif",
                marginBottom: '1.5rem',
                transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span className="fv-btn-label">ABONNE-TOI &Agrave; L&apos;INFOLETTRE</span>
              </a>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {SOCIALS.map(social => (
                  <a key={social.name} href="#" style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1.5px solid #154e85',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s',
                    textDecoration: 'none',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#154e85' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#154e85">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Middle column */}
            <div>
              {/* headline-medium, futura-pt-condensed weight 800 */}
              <h4 style={{
                fontFamily: "'futura-pt-condensed', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: TYPO.headlineMedium,
                color: '#154e85',
                letterSpacing: '-0.01em',
                marginBottom: '1rem',
              }}>INFOS PRATIQUES</h4>
              {FOOTER_INFOS.map((item, idx) => (
                <a key={item} href="#" className="fv-footer-link" style={{
                  display: 'block',
                  color: '#154e85',
                  textDecoration: 'none',
                  fontSize: TYPO.bodyMedium,
                  fontWeight: 400,
                  marginBottom: '0.5rem',
                  opacity: 0.6,
                }}
                  data-idx={idx}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                >{item}</a>
              ))}
            </div>

            {/* Right column */}
            <div>
              <h4 style={{
                fontFamily: "'futura-pt-condensed', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: TYPO.headlineMedium,
                color: '#154e85',
                letterSpacing: '-0.01em',
                marginBottom: '1rem',
              }}>LE FESTIVENT</h4>
              {FOOTER_FESTIVENT.map((item, idx) => (
                <a key={item} href="#" className="fv-footer-link" style={{
                  display: 'block',
                  color: '#154e85',
                  textDecoration: 'none',
                  fontSize: TYPO.bodyMedium,
                  fontWeight: 400,
                  marginBottom: '0.5rem',
                  opacity: 0.6,
                }}
                  data-idx={idx}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                >{item}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '1.5rem 0 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: TYPO.bodySmall,
          color: 'rgba(199,234,251,0.4)',
        }}>
          <span>&copy; 2025 | Festivent</span>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="#" style={{ color: 'rgba(199,234,251,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c7eafb')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(199,234,251,0.4)')}
            >Politique de confidentialit&eacute;</a>
            <a href="#" style={{ color: 'rgba(199,234,251,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c7eafb')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(199,234,251,0.4)')}
            >Conditions de vente</a>
            <a href="#" style={{ color: 'rgba(199,234,251,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c7eafb')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(199,234,251,0.4)')}
            >Site web par Les Pr&eacute;tentieux</a>
          </div>
          {/* Scroll to top */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid rgba(199,234,251,0.3)',
            background: 'transparent',
            color: 'rgba(199,234,251,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c7eafb'; e.currentTarget.style.color = '#c7eafb' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(199,234,251,0.3)'; e.currentTarget.style.color = 'rgba(199,234,251,0.5)' }}
          >
            &uarr;
          </button>
        </div>
      </footer>

      {/* ═══════════════════════════════════════
          14. PARTNERS MARQUEE (bottom)
          ═══════════════════════════════════════ */}
      <section style={{
        background: '#0f3356',
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Giant faded text marquee — 25s smooth */}
        <div style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          marginBottom: '2rem',
        }}>
          <div className="fv-marquee-wrapper" style={{
            display: 'inline-flex',
            animation: 'fv-marquee-partners 25s linear infinite',
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} style={{
                fontFamily: "'Metro Sans', sans-serif",
                fontWeight: 700,
                fontSize: TYPO.displayLarge,
                textTransform: 'uppercase',
                color: 'rgba(26,93,150,0.3)',
                paddingRight: '3rem',
                letterSpacing: '-0.02em',
              }}>
                MERCI &Agrave; NOS PARTENAIRES
              </span>
            ))}
          </div>
        </div>

        {/* Partner logos */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '0 2rem',
        }}>
          <img src={`${IMG}/partner-1.jpg`} alt="Partenaire 1" style={{
            height: 50,
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: 0.5,
            transition: 'opacity 0.3s',
            cursor: 'pointer',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
          />
          <img src={`${IMG}/partner-2.jpg`} alt="Partenaire 2" style={{
            height: 50,
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: 0.5,
            transition: 'opacity 0.3s',
            cursor: 'pointer',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          15. STICKY "INFOS PRATIQUES" BUTTON
          ═══════════════════════════════════════ */}
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 90,
      }}>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1.25rem',
          background: '#fef7de',
          border: '2px solid #154e85',
          borderRadius: '100px',
          color: '#154e85',
          fontWeight: 700,
          fontSize: TYPO.bodySmall,
          textTransform: 'uppercase',
          fontFamily: "'Metro Sans', sans-serif",
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          transition: 'all 0.25s',
          letterSpacing: '0.03em',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#154e85'; e.currentTarget.style.color = '#fef7de' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fef7de'; e.currentTarget.style.color = '#154e85' }}
        >
          INFOS PRATIQUES
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
