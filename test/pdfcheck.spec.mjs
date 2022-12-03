import { test, expect } from "@playwright/test";

const slugs_batch_1 = [
  "",
  "search/",
  "about-us/about-dcc/",
  "applicants/access-license-portals/",
  "about-us/announcements/",
  "applicants/application-license-fees/",
  "applicants/application-resources/",
  "applicants/equity-fee-waivers/apply-for-an-equity-fee-waiver/",
  "resources/banking-insurance/",
  "browser-chrome/",
  "browser-firefox/",
  "browser-ie/",
  "browser-safari/",
  "resources/business-filings-trademarks/",
  "about-us/cannabis-advisory-committee/",
  "cannabis-laws/",
  "resources/cannabis-recalls-and-safety-notices/",
  "licensees/cannaconnect-compliance-hub/",
  "applicants/ceqa-review-for-cannabis-businesses/",
  "cannabis-laws/compliance-with-state-law/",
  "about-us/consolidation/",
  "about-us/contact-us/",
  "licensees/cultivation/",
  "about-us/dcc-events/",
  "cannabis-laws/dcc-regulations/",
  "resources/disaster-relief-programs/",
  "licensees/distribution/",
  "docs-design-system-test-component-page/",
  "draft-homepage/",
  "applicants/equity-fee-waivers/",
  "resources/equity/",
  "licensees/events/",
  "resources/file-complaint/"
  ];
  const slugs = [
  "about-us/grant-funding/",
  "cannabis-laws/how-regulations-are-made/",
  "applicants/how-to-apply-renew/",
  "labor-peace-agreements-for-cannabis-businesses/",
  "cannabis-laws/laws-and-regulations/",
  "about-us/legislative-reports/",
  "applicants/license-types/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-abarca/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-ball/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-cargile/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-dipaci/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-donaldson/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-farrar/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-glasse/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-hua/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-ingram/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-keith/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-lutz/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-matulich/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-mitchell/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-moussalli/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/licensee-profile-swami/",
  "about-us/grant-funding/local-jurisdiction-assistance-grant-program/",
  "licensees/manufacturing/",
  "consumers/medicinal-cannabis/",
  "about-us/public-awareness-campaigns-2/",
  "about-us/public-awareness-campaigns/",
  "licensees/requirements-cannabis-goods/",
  "consumers/responsible-cannabis-use/",
  "licensees/retail/",
  "cannabis-laws/rulemaking/",
  "resources/running-business/",
  "about-us/scientific-research/",
  "resources/search-for-licensed-business/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/social-media-materials/",
  "consumers/talking-young-people-about-cannabis/",
  "resources/taxes/",
  "test-for-seo-editor/",
  "licensees/testing-laboratories/",
  "about-us/public-awareness-campaigns/this-is-california-cannabis/",
  "licensees/track-and-trace/",
  "consumers/whats-legal/",
  "cannabis-laws/where-cannabis-businesses-are-allowed/",
  "about-us/work-for-dcc/",
  "page-not-found/",
  "about-us/page-not-found/",
  "about-us/public-awareness-campaigns-review/"
  ];
  const slugs_posts_batch_1 = [
  "2017/04/26449-2/",
  "2017/05/27023-2/",
  "2017/08/27192-2/",
  "2017/09/27257-2/",
  "2017/11/27711-2/",
  "2018/03/28332-2/",
  "2018/04/28429-2/",
  "2018/05/28499-2/",
  "2018/07/28617-2/",
  "2018/12/29971-2/",
  "2018/12/30056-2/",
  "2019/01/30677-2/",
  "2019/02/31947-2/",
  "2019/03/32152-2/",
  "2019/04/32676-2/",
  "2019/04/32771-2/",
  "2019/06/33571-2/",
  "2017/07/a-major-problem-for-the-cannabis-business-banks-keep-staying-away/",
  "2018/04/a-message-for-cannabis-manufacturers/",
  "2021/11/abc-industry-advisory-cannabis-products-industrial-hemp-products-and-alcoholic-beverages/",
  "2019/05/abc-industry-advisory-on-cannabis-and-alcoholic-beverages/",
  "2017/12/alameda-county-announces-winter-cannabis-summit/",
  "2018/04/applications-for-shared-use-cannabis-manufacturing-facilities-are-now-available/",
  "2019/09/bcc-announces-enforcement-action-against-smoke-shop-illegally-selling-counterfeit-cannabis-products-in-fresno/",
  "2020/01/bcc-announces-enforcement-action-on-two-unlicensed-cannabis-retailers-in-southern-california/",
  "2019/09/bcc-announces-enforcement-action-on-two-unlicensed-cannabis-retailers-selling-illegal-vape-cartridges/",
  "2019/07/bcc-announces-enforcement-action-on-unlicensed-cannabis-retailer-in-banning-ca/",
  "2019/06/bcc-announces-enforcement-action-on-unlicensed-cannabis-retailer/",
  "2019/05/bcc-announces-enforcement-action-on-unlicensed-delivery-service/",
  "2019/06/bcc-launches-get-weedwise-campaign-focusing-on-consumer-education-and-unlicensed-cannabis-businesses/",
  "2019/12/bcc-launches-qr-code-campaign-encouraging-consumers-to-scan-and-verify-licensed-cannabis-retailers/",
  "2019/11/bcc-sends-warning-letters-to-landlords-of-illegal-cannabis-businesses/",
  "2019/03/bureau-of-cannabis-control-accepting-equity-grant-applications/",
  "2020/09/bureau-of-cannabis-control-accepting-public-university-research-grant-applications/",
  "2019/07/bureau-of-cannabis-control-addresses-statutory-changes-to-obtain-provisional-cannabis-licenses/",
  "2019/08/bureau-of-cannabis-control-addresses-weedmaps-new-state-license-number-advertising-requirements/",
  "2018/11/bureau-of-cannabis-control-announcement-regarding-temporary-license-applications/",
  "2019/03/bureau-of-cannabis-control-announces-enforcement-action-against-unlicensed-cannabis-businesses/",
  "2019/02/bureau-of-cannabis-control-announces-enforcement-action-on-illegal-cannabis-businesses/",
  // "2019/06/bureau-of-cannabis-control-announces-enforcement-action-on-two-unlicensed-costa-mesa-retailers/",
  "2019/04/bureau-of-cannabis-control-announces-enforcement-action-on-unlicensed-cannabis-businesses/",
  "2018/08/bureau-of-cannabis-control-announces-enforcement-action-on-unlicensed-cannabis-operator/",
  "2018/10/bureau-of-cannabis-control-announces-enforcement-action-on-unlicensed-cannabis-retailer/",
  "2018/08/bureau-of-cannabis-control-announces-enforcement-action-on-unlicensed-delivery-service-in-sacramento/",
  "2017/12/bureau-of-cannabis-control-announces-four-upcoming-public-licensing-workshops/",
  "2020/12/bureau-of-cannabis-control-announces-grant-solicitation-for-cannabis-equity-grants-program/",
  "2019/10/bureau-of-cannabis-control-announces-local-equity-grant-funding-recipients/",
  "2018/02/bureau-of-cannabis-control-announces-march-1-subcommittee-meetings-and-input-survey/",
  "2020/11/bureau-of-cannabis-control-announces-new-api-for-license-search-data/",
  "2017/09/bureau-of-cannabis-control-announces-official-rebranding-and-updated-websites/",
  "2019/04/bureau-of-cannabis-control-announces-opening-of-north-coast-regional-office-in-new-location/",
  "2018/06/bureau-of-cannabis-control-announces-opening-of-north-coast-regional-office/",
  "2020/11/bureau-of-cannabis-control-announces-public-university-research-grant-funding-recipients/",
  "2018/06/bureau-of-cannabis-control-announces-readoption-of-emergency-cannabis-regulations/",
  "2018/11/bureau-of-cannabis-control-announces-request-for-proposals-for-public-awareness-campaign/",
  "2018/01/bureau-of-cannabis-control-announces-subcommittee-meetings-and-input-survey/",
  "2017/11/bureau-of-cannabis-control-announces-submitting-of-proposed-emergency-regulations-and-public-comment-period/",
  "2018/05/bureau-of-cannabis-control-announces-submitting-of-proposed-readoption-of-emergency-regulations-and-public-comment-period/",
  "2017/10/bureau-of-cannabis-control-announces-three-upcoming-public-licensing-workshops/",
  "2018/10/bureau-of-cannabis-control-announces-weekly-reports/",
  "2018/11/bureau-of-cannabis-control-approves-first-annual-licenses-for-commercial-cannabis-activity/",
  "2018/04/bureau-of-cannabis-control-commercial-cannabis-licensee-bond-form/",
  "2020/11/bureau-of-cannabis-control-has-decided-to-postpone-notification-for-grant-recipients/",
  "2017/12/bureau-of-cannabis-control-issues-first-licenses-for-commercial-cannabis-activity/",
  "2017/12/bureau-of-cannabis-control-launches-online-licensing-application-system/",
  "2019/07/bureau-of-cannabis-control-now-accepting-applications-for-local-equity-grant-funding/",
  "2020/02/bureau-of-cannabis-control-submits-proposed-emergency-regulations-requiring-qr-code-certificate/",
  "2017/09/bureau-of-cannabis-control-to-hold-ceqa-study-results-workshop-in-fresno/",
  "2017/09/bureau-of-cannabis-control-to-hold-ceqa-study-results-workshop-in-long-beach/",
  "2017/09/bureau-of-cannabis-control-to-hold-final-ceqa-hearing-study-results-workshop-in-sacramento/",
  "2018/08/bureau-of-cannabis-control-to-hold-public-hearing-on-proposed-cannabis-regulations-in-los-angeles/",
  "2018/08/bureau-of-cannabis-control-to-hold-public-hearing-on-proposed-cannabis-regulations-in-sacramento/",
  "2017/10/bureau-of-cannabis-control-to-hold-public-licensing-workshop-in-los-angeles/",
  "2018/01/bureau-of-cannabis-control-to-hold-public-licensing-workshop-in-monterey/",
  "2017/10/bureau-of-cannabis-control-to-hold-public-licensing-workshop-in-riverside/",
  "2018/02/bureau-of-cannabis-control-to-hold-public-licensing-workshop-in-ukiah/",
  "2018/01/bureau-of-cannabis-control-to-hold-public-licensing-workshops-in-irvine-san-diego/",
  "2017/11/bureau-of-cannabis-control-to-host-first-cannabis-advisory-committee-meeting/",
  "2017/10/bureau-of-cannabis-control-to-host-public-licensing-workshop-in-sacramento/",
  "2018/09/bureau-of-cannabis-controls-revokes-temporary-testing-laboratory-license/",
  "2017/04/bureau-of-medical-cannabis-regulation-now-accepting-applications-for-cannabis-advisory-committee/",
  "2017/04/bureau-of-medical-cannabis-regulation-releases-proposed-regulations-for-medical-cannabis/",
  "2017/04/ca-department-of-public-health-releases-proposed-medical-cannabis-manufacturing-regulations-for-public-comment/",
  "2018/07/ca-department-of-public-health-request-for-live-scan-form-is-now-available/",
  "2018/05/calcannabis-cultivation-licensing-public-comment-period-deadline/",
  "2019/04/calcrg-grant-solicitation-application-now-available/",
  "2019/01/california-cannabis-advisory-committee-publishes-2018-annual-report/",
  "2017/07/california-cannabis-czar-lori-ajax-announced-as-keynote-speaker-for-california-cannabis-business-conference/",
  "2022/07/california-cannabis-enforcement-efforts-help-protect-people-the-environment-and-the-legal-market/",
  "2021/03/california-cannabis-equity-grants-program-provides-15-million-in-grant-funding-for-local-jurisdictions/",
  "2020/04/california-cannabis-equity-grants-program-provides-30-million-in-grant-funding-for-local-jurisdictions/",
  "2019/12/california-cannabis-experience-survey/",
  "2017/04/california-cannabis-farmers-insist-on-driving-their-own-trucks-heres-why/",
  "2019/10/california-cannabis-track-and-trace-cctt-metrc-system-workshops/",
  "2017/04/california-celebrates-420/",
  "2019/05/california-community-reinvestment-grants-program-application-due-date-reminder/",
  "2018/09/california-community-reinvestment-grants-program/",
  "2022/08/california-department-of-cannabis-control-announces-appointments-to-cannabis-advisory-committee/",
  "2022/05/california-department-of-cannabis-control-debuts-data-tool-showcasing-access-areas-for-cannabis-business/",
  "2022/07/california-department-of-cannabis-control-marks-one-year-as-state-department/",
  "2017/04/california-department-of-food-and-ag-releases-draft-regulations-on-californiasmedical-cannabis-cultivation-program/",
  "2017/07/california-department-of-food-and-agriculture-announces-public-review-and-comment-period-for-the-draft-program-environmental-impact-report-peir-for-cannabis-cultivation/",
  "2019/08/california-department-of-justice-releases-new-medicinal-cannabis-guidelines/",
  "2018/10/california-department-of-public-health-sunset-of-temporary-licenses/",
  "2018/12/california-department-of-tax-and-fee-administration-adoption-of-proposed-emergency-cannabis-tax-regulation-3702/",
  "2019/05/california-department-of-tax-and-fee-administration-reports-cannabis-tax-revenues-for-first-quarter-of-2019/",
  "2019/02/california-department-of-tax-and-fee-administration-reports-cannabis-tax-revenues-for-fourth-quarter-of-2018/",
  "2019/12/california-legislative-analysts-office-publishes-cannabis-tax-adjustment-report/",
  "2022/07/california-looks-to-standardize-cannabis-testing-statewide/",
  "2020/01/california-notices-emergency-cannabis-regulations-requiring-qr-code-certificate/",
  "2021/02/california-officially-joins-national-cannabis-regulators-association/",
  "2018/03/california-orders-weedmaps-to-stop-advertising-unlicensed-marijuana-businesses/",
  "2018/05/california-senate-passes-bill-to-create-banks-for-pot-businesses/",
  "2022/04/california-state-senate-confirms-nicole-elliott-as-director-of-the-department-of-cannabis-control/",
  "2021/12/california-to-offer-financial-support-for-cannabis-equity-businesses-through-fee-waivers/",
  "2022/08/californias-cannabis-advisory-committee-to-hold-virtual-meeting/",
  "2022/01/californias-cannabis-department-awards-nearly-100-million-in-grants-to-local-governments/",
  "2022/03/californias-cannabis-department-proposes-comprehensive-regulatory-changes/",
  "2021/12/californias-cannabis-department-proposes-regulations-to-provide-fee-waivers-for-equity-businesses-statewide/",
  "2021/12/californias-cannabis-department-seeks-members-for-cannabis-advisory-committee/",
  "2018/01/californias-cannabis-track-and-trace-cctt-system-update/",
  "2017/05/californias-pot-chief-vows-state-will-meet-compliance-deadline/",
  "2017/04/californias-weed-nuns-on-a-mission-to-heal-with-cannabis/",
  "2018/09/cannabis-advisory-committee-meeting-in-eureka/",
  "2018/11/cannabis-advisory-committee-meeting-in-fresno/",
  "2019/03/cannabis-advisory-committee-meeting-in-sacramento-2/",
  "2018/08/cannabis-advisory-committee-meeting-in-sacramento/",
  "2021/12/cannabis-advisory-committee-meeting/",
  "2018/01/cannabis-advisory-committee-to-hold-first-meeting-of-2018/",
  "2019/11/cannabis-advisory-committee-to-hold-upcoming-december-meetings-in-burlingame/",
  "2019/06/cannabis-advisory-committee-to-hold-upcoming-june-meetings-in-los-angeles/",
  "2019/10/cannabis-advisory-committee-to-hold-upcoming-october-meetings-in-burlingame/",
  "2020/12/cannabis-advisory-committee-to-hold-virtual-meeting-2/",
  "2021/02/cannabis-advisory-committee-to-hold-virtual-meeting-3/",
  "2020/09/cannabis-advisory-committee-to-hold-virtual-meeting-in-september/",
  "2020/08/cannabis-advisory-committee-to-hold-virtual-meeting-next-week/",
  "2020/10/cannabis-advisory-committee-to-hold-virtual-meeting/",
  "2021/05/cannabis-advisory-committee-to-hold-virtual-meetings/",
  "2022/08/cannabis-advisory-committee/",
  "2017/04/cannabis-and-hemp-conference-held-in-fresno/",
  "2018/06/cannabis-companies-now-have-access-to-property-liability-insurance-in-california/",
  "2018/10/cannabis-control-appeals-panel-15-day-notice-of-modification-to-text-of-proposed-regulations/",
  "2018/08/cannabis-control-appeals-panel-notice-of-proposed-rulemaking/",
  "2018/08/cannabis-control-appeals-panel-website/",
  "2018/11/cannabis-cultivation-informational-workshop-and-permitting-event/",
  "2018/08/cannabis-cultivation-permitting-workshops/",
  "2019/03/cannabis-distributors-information-on-collecting-and-paying-the-cannabis-excise-tax/",
  "2021/01/cannabis-licensing-authorities-consolidation-part-of-governors-proposed-state-budget/",
  "2020/09/cannabis-licensing-authorities-file-civil-action-against-vertical-bliss-kushy-punch-for-unlicensed-activity/",
  "2021/01/cannabis-licensing-authorities-notice-proposed-regulations-to-provide-greater-access-to-financial-services-for-licensees/",
  "2020/09/cannabis-licensing-authorities-unveil-new-unified-license-search-tool/",
  "2018/06/cannabis-retailers-cannabis-excise-tax-paid-to-your-distributor-must-be-collected-on-your-discounted-retail-sales/",
  "2018/11/cannabis-tax-revenue-increases-in-2nd-quarter-of-2018-rise-shows-compliance-trend-growing/",
  "2018/08/cannabis-tax-revenue-increases-in-2nd-quarter-of-2018/",
  "2017/08/career-opportunities-in-cannabis-regulation/",
  "2018/04/cdfa-and-cdph-temporary-license-extension-update/",
  "2018/09/cdfa-announces-calcannabis-appellations-project-public-workshops/",
  "2018/03/cdfa-announces-public-licensing-workshops-for-cannabis-cultivators-in-march-and-april/",
  "2018/01/cdfa-bureau-of-cannabis-control-and-department-of-public-health-offer-workshops-on-californias-cannabis-track-and-trace-system/",
  "2019/08/cdfa-cdph-assembly-bill-97-and-provisional-licenses/",
  "2018/01/cdfa-now-accepting-applications-for-annual-cannabis-cultivation-licenses/",
  "2017/12/cdfa-now-accepting-temporary-cannabis-licensing-applications/",
  "2020/02/cdfa-releases-the-proposed-regulations-for-the-cannabis-appellations-program/",
  "2017/11/cdfa-schedules-training-workshops-for-cannabis-cultivators-seeking-information-on-applications-for-licensing/",
  "2018/07/cdfas-calcannabis-appellations-program-survey/",
  "2022/02/cdfw-releases-cannabis-enforcement-numbers-for-2021/",
  "2022/04/cdfws-cannabis-grant-program-announces-new-funding-opportunities-for-2022/",
  "2021/11/cdfws-cannabis-grant-program-awards-nearly-1-million-for-watershed-remediation-projects/",
  "2018/06/cdph-cannabis-emergency-regulations-effective-for-an-additional-180-days/",
  "2018/04/cdph-files-emergency-regulations-for-shared-use-facilities/",
  "2018/05/cdph-files-proposed-re-adoption-of-emergency-regulations/",
  "2017/09/cdph-launches-cannabis-public-education-campaign/",
  "2018/03/cdph-releases-emergency-regulations-for-cannabis-manufacturing-in-shared-use-facilities/",
  "2018/05/cdtfa-cannabis-tax-revenues-total-60-9-million-in-first-quarter/",
  "2019/04/cdtfa-samples-of-cannabis-how-does-tax-apply/",
  "2019/11/changes-to-cannabis-excise-and-cultivation-taxes-regulation/",
  "2022/06/commemorating-juneteenth-california-department-of-cannabis-control-highlights-black-cannabis-entrepreneurs/",
  "2020/01/consolidation-of-california-cannabis-licensing-authorities/",
  "2020/01/dangerous-vaping-products-seized-from-unlicensed-cannabis-shops-during-major-enforcement-operation/",
  "2022/08/dcc-breaks-1-billion-mark-in-amount-of-illegal-cannabis-seized-just-over-a-year-after-consolidation/",
  "2022/01/dcc-is-now-accepting-requests-for-equity-fee-waivers/",
  "2022/01/dcc-orders-recall-of-packaged-cannabis-flower-due-to-mold-contamination/",
  "2022/07/dcc-provides-notice-of-modifications-to-proposed-regulatory-action-for-consolidated-medicinal-and-adult-use-commercial-cannabis-activity-regulations/",
  "2022/03/dcc-to-hold-briefing-about-upcoming-rulemaking/",
  "2018/10/deadline-for-temporary-cannabis-cultivation-license-applications/",
  "2021/10/department-of-cannabis-control-announces-100-million-local-jurisdiction-assistance-grant-program/",
  "2021/07/department-of-cannabis-control-announces-regulatory-actions/",
  "2021/07/department-of-cannabis-control-established/",
  "2021/12/department-of-cannabis-control-files-emergency-regulations-for-equity-fee-waivers/",
  "2021/09/department-of-cannabis-control-files-emergency-regulations-public-comment-period-begins-today/",
  "2022/03/department-of-cannabis-control-files-readoption-of-emergency-consolidated-cannabis-regulations/",
  "2022/05/department-of-cannabis-control-files-readoption-of-emergency-regulations-for-equity-fee-waivers/",
  "2022/06/department-of-cannabis-control-highlights-potential-for-drought-related-regulatory-relief/",
  "2022/03/department-of-cannabis-control-launches-cannaconnect-a-new-resource-to-support-californias-cannabis-license-holders/",
  "2021/10/department-of-cannabis-control-marks-100-days-as-a-new-state-department/",
  "2021/07/department-of-cannabis-control-names-leadership-team/",
  "2022/01/department-of-cannabis-control-proposes-adoption-of-conflict-of-interest-code/",
  "2021/09/department-of-cannabis-control-proposes-consolidation-of-cannabis-regulations/",
  "2022/05/department-of-cannabis-control-provides-notice-of-emergency-regulatory-action/",
  "2021/08/department-of-cannabis-control-provides-notice-of-regulatory-action-and-announces-approval-of-regulations/",
  "2022/04/department-of-cannabis-control-requests-stakeholder-input-on-equity-fee-waiver-and-deferral-regulations/",
  "2021/09/department-of-cannabis-controls-proposed-consolidated-cannabis-regulations-are-approved/",
  "2017/10/department-of-consumer-affairs-announces-appointments-to-cannabis-advisory-committee/",
  "2021/09/disaster-relief-for-cannabis-businesses-affected-by-fires/",
  "2020/02/donations-of-cannabis-and-cannabis-product/",
  "2019/12/draft-grant-solicitation-comment-period-for-cannabis-equity-grants-program/",
  "2019/05/edd-announces-several-cannabis-industry-and-state-payroll-tax-seminars/",
  "2017/11/emergency-regulations-public-comment-period/",
  "2019/09/employment-training-panel-approves-cannabis-industry-application-procedures/",
  "2018/12/go-biz-concludes-community-workshop-series-on-california-community-reinvestment-grants-program/",
  "2022/07/good-news-for-cannabis-in-governors-budget/",
  "2019/09/governor-gavin-newsom-signs-executive-order-to-confront-youth-vaping-epidemic/",
  "2019/10/governor-newsom-launches-resource-website-for-californians-impacted-by-wildfires-and-power-shutoffs/",
  ];
  const slugs_posts_batch_2 = [
  "2021/07/governor-newsom-signs-cannabis-trailer-bill-creating-the-department-of-cannabis-control/",
  "2019/12/important-announcement-regarding-external-transfers-for-metrc-users/",
  "2019/03/important-announcement-regarding-local-equity-grant-program-notice-of-funding-availability/",
  "2019/01/important-cannabis-excise-tax-reminders-for-cannabis-retailers-and-distributors/",
  "2018/03/important-information-for-cannabis-distributors/",
  "2018/04/important-message-for-bureau-of-cannabis-control-temporary-licensees/",
  "2018/07/industry-advisory-cannabis-and-alcoholic-beverages/",
  "2018/03/information-for-cannabis-retailers-how-to-collect-the-cannabis-excise-tax-from-your-customers-on-retail-sales/",
  "2018/06/information-for-the-cannabis-industry-how-tax-applies-to-immature-plants-clones-and-seeds/",
  "2019/09/investing-in-social-equity-28-5-million-works-to-counteract-impacts-of-the-war-on-drugs/",
  "2017/04/just-say-no-to-investing-in-pot-committee-advises-california-judges/",
  "2019/10/legislative-update-assembly-bill-1529-modification-to-vape-cartridge-labeling-requirements/",
  "2017/09/licensing-authorities-announce-withdrawal-of-proposed-medical-cannabis-regulations/",
  "2017/11/licensing-authorities-release-emergency-medicinal-and-adult-use-cannabis-regulations/",
  "2017/11/manufactured-cannabis-licensing-training-sessions/",
  "2017/12/marijuana-goes-legal-in-california-on-jan-1-what-you-need-to-know/",
  "2017/04/marijuana-on-religious-grounds-a-cannabis-church-opens-in-denver/",
  "2018/02/mcguire-and-wood-to-host-march-1-hearing-on-first-60-days-of-prop-64/",
  "2017/08/media-california-must-overhaul-draft-cannabis-regulations-using-emergency-process-so-sales-can-start-jan-2/",
  "2017/08/media-legal-cannabis-to-create-regulatory-jobs-on-state-local-levels/",
  "2017/08/media-start-low-and-go-slow-3-steps-to-safely-consume-marijuana-edibles/",
  "2017/10/media-uc-san-diego-developing-public-awareness-campaign-on-pots-effect-on-drivers/",
  "2019/02/microbusinesses-or-cannabis-businesses-with-multiple-licenses-how-to-calculate-the-cannabis-excise-tax-on-nonarms-length-transactions/",
  "2017/04/migrant-workers-are-making-thousands-trimming-marijuana-in-california/",
  "2018/01/more-than-400-state-licensed-cannabis-businesses-operating-on-californias-first-day-of-legal-commercial-cannabis-activity/",
  "2022/09/new-cannabis-bills-signed-by-governor-newsom-to-strengthen-the-legal-market/",
  "2019/01/new-cannabis-regulations-approved-by-the-office-of-administrative-law/",
  "2019/11/new-labeling-system-for-all-state-cannabis-cultivation-licenses/",
  "2018/06/new-packaging-and-labeling-resources-available/",
  "2018/05/new-reference-guides-for-cannabis-cultivation-license-applicants/",
  "2019/03/new-resources-for-packaging-and-labeling-of-cannabis-and-cannabis-products/",
  "2019/02/notice-of-opportunity-for-public-comment-and-public-hearing/",
  "2022/03/notice-of-proposed-readoption-of-emergency-regulations/",
  "2021/01/notice-regarding-billboard-advertisements-on-interstate-and-state-highways/",
  "2020/03/notice-regarding-covid-19-and-commercial-cannabis-businesses/",
  "2020/12/notice-regarding-state-stay-at-home-order-issued-december-3-2020/",
  "2019/01/notice-regarding-temporary-cannabis-cultivation-license-applications/",
  "2018/04/notice-regarding-temporary-cannabis-events/",
  "2018/06/notice-regarding-the-bureau-of-cannabis-controls-online-licensing-system/",
  "2018/01/notice-regarding-the-repeal-of-health-and-safety-code-section-11362-775-medical-marijuana-program-collectives-or-cooperatives/",
  "2017/10/pot-growers-in-sacramento-will-need-a-lot-of-electricity-smud-wants-to-help/",
  "2017/11/public-comment-period-for-emergency-rulemaking-action-related-to-cannabis-cultivation-licensing/",
  "2018/01/public-licensing-workshop-update-bureau-of-cannabis-control-postpones-workshop-in-ukiah/",
  "2018/06/readoption-of-the-emergency-regulations-for-cannabis-cultivation/",
  "2019/04/registering-cannabis-related-trademarks-in-california/",
  "2018/02/reminder-and-confirmation-of-advisory-subcommittee-meeting-dates-and-times/",
  "2019/06/reminder-packaging-and-labeling-compliance-for-cannabis-and-cannabis-products/",
  "2018/12/results-of-cannabis-banking-feasibility-study-to-be-released-at-public-hearing/",
  "2018/05/secretary-of-state-alex-padilla-announces-llcs-can-now-be-formed-online-launches-new-business-chatbot/",
  "2017/12/secretary-of-state-alex-padilla-launches-cannabizfile-online-cannabis-business-portal/",
  "2017/06/six-key-updates-in-californias-latest-marijuana-regulatory-proposal/",
  "2019/04/state-agencies-host-four-cannabis-permitting-workshops-in-may-and-june/",
  "2020/01/state-agencies-to-host-free-cannabis-cultivation-licensing-workshops/",
  "2017/12/state-applications-for-cannabis-manufacturing-are-now-available/",
  "2021/05/state-cannabis-authorities-laud-governor-newsoms-california-comeback-plan-proposals-for-cannabis/",
  "2019/12/state-cannabis-authorities-serve-24-search-warrants-against-illegal-cannabis-retailers/",
  "2018/10/state-cannabis-licensing-authorities-announce-changes-to-proposed-cannabis-regulations/",
  "2020/06/state-cannabis-licensing-authorities-offer-60-day-license-fee-deferrals-to-additional-licensees/",
  "2020/05/state-cannabis-licensing-authorities-offer-60-day-license-fee-deferrals/",
  "2019/03/state-cannabis-licensing-authorities-provide-provisional-licensing-update/",
  "2019/11/state-cannabis-licensing-authorities-revoke-vertical-bliss-distributor-and-manufacturer-licenses/",
  "2018/01/statement-from-bcc-chief-lori-ajax-regarding-federal-government-plans-to-rescind-the-cole-memo/",
  "2017/07/statement-on-upcoming-withdrawal-of-mcrsa-regulations/",
  "2018/02/temecula-mayor-matt-rahn-appointed-as-chair-of-californias-cannabis-advisory-committee/",
  "2017/04/this-landmark-cannabis-bill-is-great-news-for-marijuana-stocks/",
  "2018/06/transition-period-requirements/",
  "2019/01/treasurer-fiona-ma-and-assemblymember-rob-bonta-seek-temporary-cannabis-tax-reduction/",
  "2017/09/upcoming-state-of-cannabis-conference-aims-to-educate-industry-insiders-create-network/",
  "2019/04/updated-timeline-for-the-california-community-reinvestment-grants-program/",
  "2018/09/using-marijuana-legally-new-california-law-gives-you-some-privacy/",
  "2019/09/vaping-related-lung-illness-a-summary-of-the-public-health-risks-and-recommendations-for-the-public/",
  "2017/10/want-to-start-a-cannabis-business-in-california-tips-from-a-recent-workshop/",
  "2018/11/water-boards-cannabis-cultivation-enrollment-workshop/",
  "2019/06/water-quality-and-water-rights-fees-stakeholder-meeting-on-june-11-2019-handouts/",
  "2017/07/why-some-pot-businesses-hide-their-cash-and-others-truck-it-straight-to-a-federal-vault/"
];

class PdfLink {
  constructor(url, slug, list) {
    this.url = url;
    this.slug = slug;
    this.checkLink = false;
    this.list = list;
  }
  validateURL = () => {
    const url = this.url;
    const list = this.list.items;
    if (
      url !== null && 
      url.includes(".pdf")
    ) {
      list.push(url);
      this.checkLink = true;

      // @GOALS - case checking, language, metadata, accessibility, etc.
    } else {
      this.checkLink = false;
      
    }
    return this.checkLink;
  };
}

class Entry {
  constructor(slug) {
    this.page = `${slug}/`;
  }
}

class List {
  constructor() {
    this.items = [];
  }
}

test.describe.serial("PdfCheck", () => {
  console.log("---- Running PDF check");
  const list = new List();

  // @GOAL add batch support so this doesn't time out so intensively.

  slugs.forEach((slug) => {
    const entry = new Entry(slug);

    test(slug, async ({ page }) => {

      await page.goto(slug);

      const onPageLinks = page.locator("a >> visible=true");
      const count = await onPageLinks.count();

      for (let i = 1; i < count; ++i) {

        const url = await onPageLinks.nth(i).getAttribute("href");

        const linkToTry = new PdfLink(url, slug, list);
      
        if (linkToTry.validateURL() === true) {
          const response = await page.request.get(url);

          if (!response.ok()) {
            const color = response.ok()
              ? "\x1b[36m%s\x1b[0m"
              : "\x1b[35m%s\x1b[0m";
            console.log(color, "PDF not found on page: ", slug.toString());
            console.log(url.toString());
            const message = `${response.status()} - ${response.statusText()} - ${url}`;
            console.log(color, message.toString());
          }
        }
      }
    });
  });
});
