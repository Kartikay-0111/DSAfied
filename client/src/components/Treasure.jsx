import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
// import { useInView } from "motion/react";
import { animate, inView } from "motion";

export default function Treasure() {
  useEffect(() => {
  inView("svg", ({ target }) => {
    animate(
      target.querySelectorAll("rect, text"),
      { opacity: [0, 1], width: [0, 280] },
      { duration: 2, easing: [0.17, 0.55, 0.55, 1] }
    );
  });
}, [])

  const [hoveredNode, setHoveredNode] = useState(null);

  // Mock data for nodes
  const nodes = [
    {
      id: 1,
      title: "Optimal Partition of String",
      x: 151,
      y: 174,
      r: 43,
      locked: true,
    },
    { id: 2, title: "The kth factor of n", x: 766, y: 55, r: 43, locked: true },
    { id: 3, title: "Topological Sort", x: 1100, y: 545, r: 43, locked: true },
    { id: 4, title: "Mystery question", x: 1793, y: 193, r: 43, locked: true },
  ];

  const shadows = [
    { id: 1, x: 151, y: 174, r: 42.5 },
    { id: 2, x: 766, y: 55, r: 42.5 },
    { id: 3, x: 1100, y: 545, r: 42.5 },
    { id: 4, x: 1793, y: 193, r: 42.5 },
  ];
  return (
    <div className="path-ui-container bg-[#E8A366] h-screen w-screen p-10">
      <div className="bg-[#F4DBA5] h-full w-full rounded-xl flex items-center justify-center">
        <svg
          viewBox="0 0 1839 644"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "80vw", height: "70vh" }}
        >
          <path
            d="M0.666667 630.424C0.666667 637.788 6.6362 643.757 14 643.757C21.3638 643.757 27.3333 637.788 27.3333 630.424C27.3333 623.06 21.3638 617.091 14 617.091C6.6362 617.091 0.666667 623.06 0.666667 630.424ZM338 540.924L335.881 539.598L338 540.924ZM151.5 161.424L149.103 160.715L151.5 161.424ZM680.5 38.9241L681.059 36.4873L680.5 38.9241ZM1006.5 414L1004.43 415.401L1006.5 414ZM1542.5 540.924L1541.86 538.508L1542.5 540.924ZM14 630.424C13.7868 632.915 13.7869 632.915 13.787 632.915C13.7871 632.915 13.7872 632.915 13.7873 632.915C13.7875 632.915 13.7877 632.915 13.788 632.915C13.7886 632.915 13.7894 632.915 13.7904 632.915C13.7924 632.915 13.7952 632.916 13.7989 632.916C13.8063 632.917 13.8169 632.918 13.8309 632.919C13.8588 632.921 13.8999 632.924 13.9541 632.929C14.0624 632.938 14.2228 632.951 14.4339 632.967C14.8562 633.001 15.4816 633.048 16.2994 633.107C17.935 633.224 20.3402 633.384 23.4295 633.556L23.7086 628.564C20.6465 628.393 18.2672 628.235 16.6561 628.12C15.8505 628.062 15.237 628.015 14.8263 627.983C14.621 627.967 14.4663 627.954 14.3637 627.946C14.3123 627.941 14.274 627.938 14.2489 627.936C14.2363 627.935 14.227 627.934 14.2211 627.934C14.2181 627.934 14.2159 627.933 14.2146 627.933C14.214 627.933 14.2135 627.933 14.2133 627.933C14.2131 627.933 14.2131 627.933 14.2131 627.933C14.213 627.933 14.2131 627.933 14.2131 627.933C14.2131 627.933 14.2132 627.933 14 630.424ZM42.9273 634.353C48.7495 634.512 55.3038 634.624 62.4583 634.642L62.4714 629.643C55.3608 629.624 48.8477 629.513 43.0634 629.355L42.9273 634.353ZM81.9357 634.459C88.1675 634.326 94.6903 634.113 101.444 633.8L101.212 628.805C94.5027 629.116 88.0214 629.328 81.8284 629.461L81.9357 634.459ZM120.919 632.643C127.272 632.18 133.763 631.623 140.35 630.954L139.846 625.98C133.309 626.643 126.865 627.197 120.556 627.656L120.919 632.643ZM159.732 628.685C166.132 627.833 172.583 626.867 179.047 625.774L178.214 620.844C171.811 621.926 165.418 622.884 159.071 623.729L159.732 628.685ZM198.236 622.148C204.615 620.808 210.972 619.332 217.271 617.707L216.023 612.866C209.801 614.47 203.518 615.929 197.209 617.254L198.236 622.148ZM236.089 612.333C242.363 610.356 248.541 608.209 254.587 605.88L252.789 601.214C246.848 603.503 240.768 605.616 234.586 607.564L236.089 612.333ZM272.611 598.175C278.609 595.333 284.421 592.275 290.002 588.984L287.463 584.677C282.022 587.885 276.344 590.874 270.47 593.656L272.611 598.175ZM306.398 578.108C311.731 574.119 316.761 569.851 321.432 565.286L317.937 561.71C313.435 566.11 308.575 570.236 303.403 574.104L306.398 578.108ZM334.502 550.435C336.484 547.79 338.359 545.062 340.119 542.251L335.881 539.598C334.197 542.288 332.401 544.901 330.5 547.437L334.502 550.435ZM340.119 542.251C342.088 539.106 343.858 535.984 345.435 532.886L340.98 530.617C339.472 533.578 337.775 536.571 335.881 539.598L340.119 542.251ZM353.059 513.057C354.925 505.87 355.779 498.811 355.733 491.867L350.734 491.899C350.776 498.405 349.977 505.031 348.22 511.801L353.059 513.057ZM352.838 470.701C351.051 463.967 348.485 457.356 345.271 450.849L340.788 453.064C343.875 459.313 346.315 465.612 348.005 471.984L352.838 470.701ZM334.488 432.606C330.645 426.988 326.381 421.429 321.782 415.914L317.942 419.116C322.457 424.531 326.622 429.964 330.361 435.429L334.488 432.606ZM307.789 400.247C303.085 395.284 298.164 390.341 293.091 385.408L289.605 388.993C294.641 393.889 299.512 398.783 304.16 403.687L307.789 400.247ZM277.939 371.06C272.881 366.372 267.736 361.681 262.559 356.98L259.197 360.681C264.371 365.379 269.501 370.057 274.54 374.727L277.939 371.06ZM247.159 342.994C242.033 338.32 236.926 333.626 231.888 328.903L228.468 332.551C233.53 337.296 238.655 342.006 243.791 346.689L247.159 342.994ZM216.929 314.538C211.969 309.637 207.135 304.697 202.482 299.71L198.826 303.121C203.534 308.166 208.415 313.155 213.415 318.095L216.929 314.538ZM188.794 284.205C184.334 278.828 180.138 273.391 176.268 267.881L172.177 270.755C176.134 276.389 180.412 281.933 184.946 287.398L188.794 284.205ZM165.343 250.486C161.993 244.412 159.093 238.247 156.716 231.977L152.04 233.75C154.511 240.264 157.514 246.643 160.965 252.9L165.343 250.486ZM151.144 212.429C149.89 205.832 149.25 199.104 149.301 192.23L144.301 192.193C144.247 199.405 144.92 206.457 146.232 213.363L151.144 212.429ZM151.414 172.105C152.077 168.819 152.902 165.495 153.897 162.134L149.103 160.715C148.067 164.215 147.206 167.682 146.513 171.116L151.414 172.105ZM153.897 162.134C154.859 158.884 155.872 155.697 156.936 152.57L152.203 150.959C151.117 154.15 150.083 157.402 149.103 160.715L153.897 162.134ZM164.105 134.114C166.819 127.945 169.754 122.045 172.901 116.406L168.534 113.97C165.309 119.75 162.304 125.79 159.528 132.101L164.105 134.114ZM183.376 99.6657C187.199 94.1991 191.252 89.0167 195.522 84.107L191.749 80.8257C187.363 85.8682 183.202 91.1894 179.278 96.8003L183.376 99.6657ZM209.277 69.9003C214.118 65.4049 219.178 61.1848 224.443 57.2279L221.439 53.2309C216.039 57.2894 210.846 61.6203 205.875 66.2361L209.277 69.9003ZM240.824 46.1438C246.433 42.7323 252.23 39.5669 258.203 36.6362L256.001 32.1474C249.898 35.1416 243.968 38.379 238.225 41.8719L240.824 46.1438ZM276.36 28.6457C282.45 26.2515 288.692 24.0658 295.074 22.0783L293.588 17.3044C287.096 19.3261 280.739 21.5517 274.53 23.9924L276.36 28.6457ZM314.223 16.7982C320.595 15.2552 327.085 13.8854 333.681 12.6799L332.783 7.76133C326.098 8.98303 319.515 10.3722 313.046 11.9386L314.223 16.7982ZM353.354 9.60219C359.874 8.74549 366.482 8.0318 373.168 7.45296L372.736 2.4716C365.981 3.05647 359.299 3.778 352.703 4.6448L353.354 9.60219ZM393.067 6.13085C399.655 5.82028 406.306 5.62774 413.012 5.54584L412.951 0.546213C406.19 0.628783 399.48 0.822957 392.831 1.1364L393.067 6.13085ZM432.975 5.61873C439.587 5.74391 446.243 5.96665 452.935 6.28016L453.169 1.28563C446.433 0.970061 439.731 0.745728 433.07 0.619626L432.975 5.61873ZM472.877 7.46941C479.491 7.9456 486.131 8.50236 492.791 9.13326L493.262 4.15555C486.567 3.52126 479.889 2.96134 473.236 2.48232L472.877 7.46941ZM512.67 11.2249C519.275 11.9868 525.891 12.8148 532.511 13.7027L533.176 8.74706C526.527 7.8553 519.88 7.02345 513.243 6.2578L512.67 11.2249ZM552.31 16.5298C558.901 17.5263 565.489 18.576 572.066 19.6728L572.888 14.7409C566.287 13.6402 559.675 12.5865 553.057 11.586L552.31 16.5298ZM591.778 23.1018C598.355 24.2916 604.914 25.5227 611.448 26.7888L612.399 21.8802C605.846 20.6103 599.267 19.3753 592.669 18.1816L591.778 23.1018ZM631.076 30.7085C637.641 32.0571 644.172 33.4352 650.664 34.8366L651.719 29.9491C645.212 28.5445 638.664 27.1629 632.082 25.8108L631.076 30.7085ZM670.215 39.15C673.47 39.8829 676.712 40.6201 679.941 41.3608L681.059 36.4873C677.824 35.7452 674.575 35.0065 671.313 34.2721L670.215 39.15ZM679.941 41.3608C683.152 42.0974 686.322 42.8876 689.452 43.7301L690.752 38.9019C687.561 38.0431 684.331 37.2378 681.059 36.4873L679.941 41.3608ZM708.048 49.503C714.242 51.6904 720.273 54.0936 726.15 56.7006L728.177 52.13C722.182 49.4707 716.03 47.0194 709.713 44.7883L708.048 49.503ZM743.655 65.2957C749.399 68.3975 754.991 71.7034 760.443 75.2007L763.143 70.9922C757.588 67.429 751.888 64.0591 746.03 60.8961L743.655 65.2957ZM776.469 86.3163C781.676 90.2062 786.751 94.2768 791.705 98.5153L794.956 94.7159C789.921 90.4089 784.76 86.2692 779.462 82.3107L776.469 86.3163ZM806.155 111.662C810.825 116.169 815.388 120.829 819.852 125.627L823.513 122.22C818.99 117.361 814.365 112.637 809.627 108.064L806.155 111.662ZM832.832 140.269C837.023 145.222 841.129 150.296 845.161 155.479L849.108 152.409C845.036 147.176 840.887 142.048 836.649 137.039L832.832 140.269ZM856.916 171.169C860.727 176.44 864.474 181.804 868.168 187.25L872.306 184.444C868.586 178.96 864.81 173.555 860.969 168.24L856.916 171.169ZM878.976 203.63C882.497 209.109 885.976 214.655 889.42 220.258L893.679 217.639C890.22 212.011 886.723 206.436 883.182 200.927L878.976 203.63ZM899.573 237.084C902.905 242.702 906.211 248.364 909.5 254.061L913.83 251.561C910.533 245.85 907.216 240.171 903.873 234.534L899.573 237.084ZM919.267 271.143C922.495 276.837 925.714 282.554 928.931 288.286L933.291 285.838C930.072 280.103 926.849 274.379 923.617 268.677L919.267 271.143ZM938.559 305.46C941.768 311.183 944.983 316.911 948.212 322.633L952.566 320.176C949.341 314.46 946.128 308.737 942.921 303.015L938.559 305.46ZM957.949 339.769C961.218 345.474 964.508 351.165 967.829 356.83L972.143 354.302C968.832 348.653 965.549 342.977 962.287 337.283L957.949 339.769ZM977.914 373.781C981.324 379.421 984.773 385.026 988.268 390.586L992.501 387.925C989.023 382.392 985.59 376.812 982.193 371.194L977.914 373.781ZM998.951 407.195C1000.76 409.944 1002.59 412.68 1004.43 415.401L1008.57 412.599C1006.74 409.896 1004.93 407.177 1003.13 404.444L998.951 407.195ZM1004.43 415.401C1006.22 418.043 1007.98 420.869 1009.76 423.86L1014.06 421.31C1012.25 418.258 1010.43 415.344 1008.57 412.599L1004.43 415.401ZM1019.62 441.575C1022.7 447.29 1025.93 453.317 1029.42 459.514L1033.78 457.061C1030.32 450.914 1027.11 444.933 1024.02 439.202L1019.62 441.575ZM1039.92 477.143C1043.49 482.762 1047.36 488.437 1051.59 494.089L1055.59 491.09C1051.45 485.556 1047.66 479.989 1044.14 474.46L1039.92 477.143ZM1064.71 510.023C1069.19 514.969 1074.04 519.835 1079.3 524.567L1082.64 520.849C1077.51 516.237 1072.79 511.492 1068.42 506.665L1064.71 510.023ZM1095.35 537.542C1100.73 541.443 1106.48 545.198 1112.63 548.769L1115.14 544.444C1109.13 540.959 1103.53 537.297 1098.29 533.494L1095.35 537.542ZM1131.02 558.283C1137.01 561.036 1143.33 563.625 1150 566.027L1151.7 561.322C1145.15 558.967 1138.96 556.432 1133.1 553.739L1131.02 558.283ZM1169.57 572.224C1175.94 573.984 1182.58 575.586 1189.53 577.017L1190.54 572.12C1183.7 570.711 1177.16 569.134 1170.9 567.405L1169.57 572.224ZM1209.74 580.556C1216.29 581.512 1223.07 582.326 1230.1 582.99L1230.57 578.012C1223.62 577.356 1216.92 576.552 1210.46 575.609L1209.74 580.556ZM1250.59 584.451C1257.24 584.78 1264.1 584.982 1271.18 585.052L1271.23 580.053C1264.22 579.983 1257.42 579.782 1250.83 579.457L1250.59 584.451ZM1291.54 584.895C1298.15 584.732 1304.92 584.46 1311.88 584.075L1311.6 579.082C1304.7 579.465 1297.97 579.735 1291.41 579.897L1291.54 584.895ZM1332.35 582.649C1339.01 582.094 1345.82 581.44 1352.79 580.684L1352.25 575.713C1345.32 576.465 1338.55 577.115 1331.93 577.666L1332.35 582.649ZM1372.9 578.271C1379.57 577.397 1386.36 576.435 1393.29 575.38L1392.54 570.437C1385.64 571.486 1378.88 572.444 1372.25 573.313L1372.9 578.271ZM1413.34 572.138C1419.93 571.011 1426.64 569.805 1433.46 568.517L1432.53 563.604C1425.74 564.886 1419.06 566.088 1412.5 567.21L1413.34 572.138ZM1453.54 564.563C1460.07 563.225 1466.7 561.815 1473.43 560.332L1472.36 555.449C1465.65 556.927 1459.04 558.332 1452.53 559.665L1453.54 564.563ZM1493.43 555.789C1499.92 554.268 1506.51 552.681 1513.19 551.028L1511.99 546.175C1505.33 547.823 1498.76 549.404 1492.29 550.92L1493.43 555.789ZM1533.02 546C1536.37 545.13 1539.74 544.243 1543.14 543.34L1541.86 538.508C1538.47 539.408 1535.1 540.293 1531.76 541.161L1533.02 546ZM1543.14 543.34C1546.57 542.429 1549.96 541.512 1553.32 540.591L1551.99 535.769C1548.65 536.687 1545.27 537.6 1541.86 538.508L1543.14 543.34ZM1573 534.996C1579.63 533.046 1586.11 531.073 1592.44 529.08L1590.94 524.311C1584.64 526.294 1578.19 528.257 1571.59 530.199L1573 534.996ZM1611.93 522.719C1618.52 520.489 1624.93 518.235 1631.17 515.959L1629.46 511.262C1623.26 513.524 1616.88 515.765 1610.33 517.983L1611.93 522.719ZM1650.22 508.731C1656.77 506.145 1663.11 503.534 1669.25 500.899L1667.27 496.305C1661.18 498.919 1654.89 501.512 1648.38 504.08L1650.22 508.731ZM1687.62 492.658C1694.06 489.636 1700.26 486.588 1706.2 483.516L1703.91 479.073C1698.02 482.115 1691.89 485.135 1685.5 488.131L1687.62 492.658ZM1724.22 473.716C1730.32 470.223 1736.12 466.703 1741.63 463.161L1738.93 458.954C1733.49 462.449 1727.76 465.925 1721.74 469.379L1724.22 473.716ZM1758.45 451.668C1764.24 447.45 1769.65 443.207 1774.71 438.945L1771.49 435.121C1766.52 439.304 1761.2 443.475 1755.5 447.627L1758.45 451.668ZM1789.91 425.05C1794.99 419.995 1799.6 414.924 1803.78 409.847L1799.92 406.669C1795.85 411.614 1791.35 416.564 1786.38 421.508L1789.91 425.05ZM1815.94 393.231C1819.86 387.152 1823.2 381.084 1826.02 375.049L1821.49 372.933C1818.77 378.76 1815.54 384.629 1811.74 390.523L1815.94 393.231ZM1833.38 355.667C1835.39 348.834 1836.79 342.077 1837.65 335.427L1832.7 334.782C1831.86 341.177 1830.52 347.677 1828.58 354.253L1833.38 355.667ZM1838.71 314.673C1838.52 307.617 1837.79 300.736 1836.64 294.072L1831.71 294.926C1832.83 301.369 1833.53 308.008 1833.71 314.807L1838.71 314.673ZM1831.76 273.969C1829.65 267.188 1827.17 260.716 1824.48 254.608L1819.9 256.627C1822.53 262.578 1824.94 268.871 1826.99 275.454L1831.76 273.969ZM1815.19 236.172C1811.51 229.699 1807.75 223.853 1804.19 218.731L1800.09 221.588C1803.57 226.598 1807.25 232.315 1810.84 238.64L1815.19 236.172ZM1791.62 202.331C1789.55 199.886 1787.85 197.996 1786.66 196.713C1786.06 196.071 1785.59 195.581 1785.27 195.248C1785.11 195.082 1784.99 194.955 1784.9 194.868C1784.86 194.825 1784.83 194.792 1784.8 194.769C1784.79 194.757 1784.78 194.748 1784.78 194.742C1784.77 194.739 1784.77 194.736 1784.77 194.734C1784.77 194.733 1784.77 194.732 1784.77 194.732C1784.77 194.731 1784.77 194.731 1784.77 194.731C1784.77 194.731 1784.77 194.731 1784.77 194.731C1784.77 194.73 1784.77 194.73 1783 196.5C1781.23 198.27 1781.23 198.27 1781.23 198.27C1781.23 198.27 1781.23 198.269 1781.23 198.269C1781.23 198.269 1781.23 198.269 1781.23 198.269C1781.23 198.269 1781.23 198.269 1781.23 198.27C1781.23 198.27 1781.24 198.272 1781.24 198.273C1781.24 198.277 1781.25 198.284 1781.26 198.292C1781.27 198.31 1781.3 198.338 1781.34 198.376C1781.41 198.451 1781.53 198.567 1781.68 198.721C1781.97 199.031 1782.42 199.497 1782.99 200.113C1784.13 201.346 1785.79 203.179 1787.8 205.561L1791.62 202.331Z"
            fill="black"
          ></path>

          {nodes.map((node) => {
            return (
              <g
                key={node.id}
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={node.x} cy={node.y} r={node.r} fill="#D9D9D9" />

                <rect
                  x={node.x - 10}
                  y={node.y + 40}
                  width="280"
                  height="80"
                  rx="20"
                  ry="20"
                  className="fill-gray-300 stroke-black stroke-1"
                ></rect>

                <text
                  x={node.x + 100}
                  y={node.y + 80}
                  textAnchor="middle"
                  className="fill-black font-bold text-xl"
                  
                  style={{ fontFamily: "Arial, sans-serif", fontSize: "30" }}
                >
                  {node.title}
                </text>
              </g>
            );
          })}

          {shadows.map((shadow) => {
            return (
              <g key={shadow.id} xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx={shadow.x}
                  cy={shadow.y}
                  r={shadow.r}
                  stroke="black"
                />
              </g>
            );
          })}

          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M157.877 161.626C157.877 159.802 157.153 158.053 155.863 156.764C154.574 155.474 152.825 154.75 151.001 154.75C149.177 154.75 147.428 155.474 146.139 156.764C144.849 158.053 144.125 159.802 144.125 161.626V169.877"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M160.625 169.874H141.375C139.097 169.874 137.25 171.721 137.25 173.999V189.124C137.25 191.402 139.097 193.249 141.375 193.249H160.625C162.903 193.249 164.75 191.402 164.75 189.124V173.999C164.75 171.721 162.903 169.874 160.625 169.874Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M772.877 50.8767V42.7114C772.877 40.8878 772.153 39.1389 770.863 37.8494C769.574 36.5599 767.825 35.8354 766.001 35.8354C764.177 35.8354 762.428 36.5599 761.139 37.8494C759.849 39.1389 759.125 40.8878 759.125 42.7114V50.8767"
            stroke="#333333"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M775.625 50.8745H756.375C754.097 50.8745 752.25 52.7213 752.25 54.9995V70.1245C752.25 72.4027 754.097 74.2495 756.375 74.2495H775.625C777.904 74.2495 779.75 72.4027 779.75 70.1245V54.9995C779.75 52.7213 777.904 50.8745 775.625 50.8745Z"
            stroke="#333333"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M1106.88 540.877V532.711C1106.88 530.888 1106.15 529.139 1104.86 527.849C1103.57 526.56 1101.82 525.835 1100 525.835C1098.18 525.835 1096.43 526.56 1095.14 527.849C1093.85 529.139 1093.12 530.888 1093.12 532.711V540.877"
            stroke="#333333"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M1109.63 540.874H1090.38C1088.1 540.874 1086.25 542.721 1086.25 544.999V560.124C1086.25 562.403 1088.1 564.249 1090.38 564.249H1109.63C1111.9 564.249 1113.75 562.403 1113.75 560.124V544.999C1113.75 542.721 1111.9 540.874 1109.63 540.874Z"
            stroke="#333333"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <defs xmlns="http://www.w3.org/2000/svg">
            <filter
              id="filter0_d_56_14"
              x="96.1"
              y="127.1"
              width="109.8"
              height="109.8"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="5.95" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_56_14"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_56_14"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_56_14"
              x="711.1"
              y="8.1"
              width="109.8"
              height="109.8"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="5.95" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_56_14"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_56_14"
                result="shape"
              />
            </filter>
            <filter
              id="filter2_d_56_14"
              x="1045.1"
              y="498.1"
              width="109.8"
              height="109.8"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="5.95" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_56_14"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_56_14"
                result="shape"
              />
            </filter>
            <filter
              id="filter3_d_56_14"
              x="1738.1"
              y="146.1"
              width="109.8"
              height="109.8"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="5.95" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_56_14"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_56_14"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}