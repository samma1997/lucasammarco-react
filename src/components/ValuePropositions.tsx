'use client'

export default function ValuePropositions() {
  return (
    <div className="last-section bg-white">
      <div className="w-layout-grid grid-container">
        <div className="section__intro-text">
          <div className="nav-tag color-black split-tag">Posture</div>
          <p className="manifesto clipping-text">
            We are the strategic and digital arm of your company,<br />
            fully integrated and operational.
          </p>
        </div>
      </div>

      <div className="section-values">
        <div className="container color-black">
          <div className="value-list">
            {/* Value 1 */}
            <div className="value-item top-align">
              <div className="value-icon color-orange w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="currentColor">
                  <path d="M28.7197 0C44.5813 0 57.4403 12.8582 57.4404 28.7197C57.4404 44.5813 44.5813 57.4404 28.7197 57.4404C12.8584 57.4402 6.5975e-05 44.5811 0 28.7197C0.000147413 12.8584 12.8584 0.000263891 28.7197 0ZM2.02051 29.7207C2.53478 43.6819 13.7585 54.9049 27.7197 55.4189V29.7207H2.02051ZM29.7197 55.4189C44.0135 54.8931 55.4404 43.1419 55.4404 28.7197C55.4403 14.2976 44.0134 2.54536 29.7197 2.01953V55.4189ZM27.7197 2.01953C13.7578 2.5335 2.53382 13.7586 2.02051 27.7207H27.7197V2.01953Z" fill="#FA4838" />
                </svg>
              </div>
              <div className="value-text">
                <h4>Product centric,<br />Business Driven</h4>
                <p>Bring your brand to life through a unique, coherent and emotionally engaging digital experience.</p>
              </div>
              <div className="value-item__line top"></div>
              <div className="value-item__line bot"></div>
            </div>

            <div className="value-divider"></div>

            {/* Value 2 */}
            <div className="value-item top-align">
              <div className="value-icon color-orange w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="57" viewBox="0 0 58 57" fill="none">
                  <path d="M57.4502 56.8203H0V0H57.4502V56.8203ZM55.4502 28.7324C41.3566 29.2843 30.0444 40.689 29.6416 54.8203H55.4502V28.7324ZM27.8945 11.7305C23.74 22.0935 13.7552 29.4912 2 29.8633V54.8203H27.6348L27.8945 11.7305ZM29.6943 44.8613C33.8319 34.5384 43.7549 27.1556 55.4502 26.7295V2H29.9541L29.6943 44.8613ZM2 27.8613C16.0818 27.3823 27.4195 16.0714 27.9395 2H2V27.8613Z" fill="#FA4838" />
                </svg>
              </div>
              <div className="value-text">
                <h4>Excellence<br />operational</h4>
                <p>Ideas, concepts, and slides are good. But it is in the production and the detail that the real difficulty of building an experience that makes an impression is hidden.</p>
              </div>
              <div className="value-item__line top"></div>
              <div className="value-item__line bot"></div>
            </div>

            <div className="value-divider"></div>

            {/* Value 3 */}
            <div className="value-item top-align">
              <div className="value-icon color-orange w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
                  <path d="M28.6201 0C36.6084 0.000185128 43.1235 6.30373 43.4648 14.208C51.321 14.601 57.5702 21.0961 57.5703 29.0498C57.5701 37.0143 51.3038 43.5138 43.4326 43.8906C42.8308 51.5453 36.4294 57.5692 28.6201 57.5693C20.8042 57.5691 14.3972 51.5351 13.8047 43.8711C6.09058 43.3296 0.00018935 36.9016 0 29.0498C0.00012607 21.2086 6.07408 14.7862 13.7734 14.2295C14.1039 6.31514 20.6246 0.000192842 28.6201 0ZM28.7852 34.2461C26.7838 39.607 21.7762 43.5007 15.8125 43.8779C16.4028 50.4327 21.9117 55.5691 28.6201 55.5693C35.3368 55.5692 40.8489 50.4199 41.4277 43.8535C35.6099 43.3561 30.7496 39.5077 28.7852 34.2461ZM43.418 16.209C42.897 21.9976 39.0574 26.8276 33.8154 28.7842C39.2156 30.7998 43.1282 35.8659 43.457 41.8867C50.2116 41.4999 55.5701 35.9013 55.5703 29.0498C55.5702 22.1851 50.191 16.5764 43.418 16.209ZM27.6914 29.8828C21.2982 30.3393 16.1987 35.4693 15.7881 41.875C22.1823 41.419 27.2817 36.2897 27.6914 29.8828ZM13.8232 16.2314C7.20596 16.7596 2.00013 22.2967 2 29.0498C2.00019 35.7895 7.18554 41.3175 13.7842 41.8643C14.1215 35.8537 18.0308 30.7976 23.4238 28.7842C18.189 26.8298 14.3521 22.0097 13.8232 16.2314ZM29.8789 29.9111C30.2945 36.1936 35.2216 41.2418 41.4502 41.8477C41.0342 35.5652 36.1078 30.5163 29.8789 29.9111ZM15.832 16.2256C16.4804 22.367 21.4518 27.2187 27.6465 27.6826C26.9973 21.5412 22.0271 16.6885 15.832 16.2256ZM41.4033 16.2549C35.3745 16.8635 30.5746 21.6368 29.9248 27.6533C35.9551 27.0457 40.754 22.2728 41.4033 16.2549ZM28.6201 2C21.7333 2.00019 16.1111 7.41392 15.7764 14.2178C21.7556 14.5815 26.7796 18.4811 28.7852 23.8525C30.7539 18.5803 35.6304 14.7267 41.4639 14.2422C41.1414 7.42689 35.5152 2.00018 28.6201 2Z" fill="#FA4838" />
                </svg>
              </div>
              <div className="value-text">
                <h4>A genuine <br />Doers DNA</h4>
                <p>Business &gt; Product &gt; People: No theory above ground, we work alongside your teams to build real and effective solutions.</p>
              </div>
              <div className="value-item__line top"></div>
              <div className="value-item__line bot"></div>
            </div>

            <div className="value-divider"></div>

            {/* Value 4 */}
            <div className="value-item top-align">
              <div className="value-icon color-orange w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
                  <path d="M28.8008 0C44.713 0.000263844 57.6005 12.899 57.6006 28.8008V29.8008H29.8008V57.6006H28.8008C12.8885 57.6005 0.00026382 44.7025 0 28.8008V27.8008H27.8008V0H28.8008ZM2.02148 29.8008C2.5353 43.8038 13.7894 55.0662 27.8008 55.5801V29.8008H2.02148ZM29.8008 27.8008H55.5801C55.0663 13.7978 43.8122 2.53536 29.8008 2.02148V27.8008Z" fill="#FA4838" />
                </svg>
              </div>
              <div className="value-text">
                <h4>Transparencies<br />And without detours</h4>
                <p>Success is based on people<br />and just the right time. That is why we work with you in an honest collaboration,<br />simple and straightforward.</p>
              </div>
              <div className="value-item__line top"></div>
              <div className="value-item__line bot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
