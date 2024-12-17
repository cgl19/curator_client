import React, { useEffect } from 'react';
import $ from 'jquery'; // Make sure jQuery is installed
import styles from './TikTokUpdated.module.css';
import avatar from '../../../../public/assets/images/avatars/avatar_25.jpg';
export default function TikTokUpdated() {
    useEffect(() => {
        // Custom jQuery logic
        $('.col').each(function () {
            $(this).text('This is a column!');
        }); 
 
        // Example event listener
        $('.col').on('click', function () {
            alert('Column clicked!');
        });

        // Cleanup on component unmount
        return () => {
            $('.col').off('click');
        };
    }, []); // Empty dependency array ensures this runs only once after component mounts

    return (
        <> 
            <div className={styles.row}>
                <div className={styles.col}>
                    {/* user info */}
                    <div className={styles.useInfo}>
                         <div className={styles.useImgContainer}>
                         <img src={avatar} alt="User Avatar" />
                            <p>User name</p>
                         </div>
                    </div>

                    {/* title section */}
                    <div className={styles.title}>
                        <div className={styles.titleContainer}>
                           <p>Caption</p>
                            <input type="text" name="title" id="title" placeholder='Enter title' />
                        </div>
                    </div>



                    {/* privacy section */}
                    <div className={styles.privacy}>
                        <div className={styles.privacyContainer}>
                            <p>Privacy</p>
                            <select name="privacy" id="privacy">
                                <option value="">Select Privacy</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="Friends">Friends</option>

                            </select>
                        </div>
                    </div>

                    {/* disclosure option */}
                    <div className={styles.disclose}>
                        <div className={styles.discloseContainer}>
                            <p>Disclosure Options</p>
                            <div className={styles.discloseOptions}>
                                <input type="checkbox" id="commercial" name="commercial" /> 
                                <label htmlFor="disclose1">Commercial Content</label>
                                <input type="checkbox" id="brand" name="brand" /> 
                                <label htmlFor="disclose1">Your Brand</label>
                                <input type="checkbox" id="branded" name="branded" /> 
                                <label htmlFor="disclose1">Branded Content</label>
                            </div>
                            
                        </div>
                    </div>


                    {/* interaction option */}
                    <div className={styles.interaction}>
                        <div className={styles.interactionContainer}>
                            <p>Interaction Options</p>
                            <div className={styles.interactionOptions}>
                                <input type="checkbox" id="comments" name="comments" /> 
                                <label htmlFor="disclose1">Allow Comments</label>
                                <input type="checkbox" id="duet" name="duet" /> 
                                <label htmlFor="disclose1">Allow Duet</label>
                                <input type="checkbox" id="stitch" name="stitch" /> 
                                <label htmlFor="disclose1">Allow Stitch</label>
                            </div>
                            
                        </div>
                    </div>


                    {/* media */}
                    <div className={styles.media}>
                        <div className={styles.mediaContainer}>
                            <p>Upload Media</p>
                            <div className={styles.mediaSection}>
                               
                            </div>
                            
                        </div>
                    </div>


                    {/* publish button */}
                    <div className={styles.action}>
                        <div className={styles.actionContainer}>
                           <button className='bg-info'>
                             Cancel
                           </button>
                           <button>
                            Publish
                           </button>
                            
                        </div>
                    </div>
    
                </div>

                {/* //column 2 */}
                <div className={styles.col}>
                    <div className={styles.headingSection}>
                        <p>Post Preview</p>
                    </div>
                      {/* preview */}
                    <div className={styles.previewContainer}>
                        <div className={styles.preview}>
                            <img src="../../../../public/assets/images/covers/cover_1.jpg" alt="" />
                            <div className={styles.previewLabel}>
                                <p></p>
                               <div>
                                <span>@ user</span>
                               </div>
                            </div>
                        </div>

                    </div>
                      
    

                </div>
            </div>
        </>
    ); 
}
