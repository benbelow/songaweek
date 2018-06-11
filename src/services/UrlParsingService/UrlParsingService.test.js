import { extractUrls, getHost } from './UrlParsingService';
import { Hosts } from '../../config/Hosts';

describe('UrlParsingService', () => {
    describe('extractUrls', () => {
        [
            'http://website.com',
            'https://www.website.com',
            'https://website.co.uk',
            'https://website.de',
            'ftp://website',
        ].forEach(url => {
            it('matches valid url', () => {
                expect(extractUrls(url)).not.toBe(null);
            });
        });

        [
            'website.com',
            'httpf://website.com',
            'httpwebsite.com',
            'http:website.com',
        ].forEach(url => {
            it('does not match invalid url', () => {
                expect(extractUrls(url)).toBe(null);
            });
        });

        it('returns multiple urls from string', () => {
            expect(extractUrls('http://www.google.com, https://www.songaweek.com').length).toBe(2);
        });
    });

    describe('getHost', () => {
        it('matches soundcloud url', () => {
            expect(getHost('www.soundcloud.com/track')).toBe(Hosts.SOUNDCLOUD);
        });

        it('matches clyp url', () => {
            expect(getHost('http://clyp.it/track')).toBe(Hosts.CLYP);
            expect(getHost('https://clyp.it/track')).toBe(Hosts.CLYP);
        });

        it('matches youtube url', () => {
            expect(getHost('www.youtube.com/track')).toBe(Hosts.YOUTUBE);
            expect(getHost('www.youtu.be/track')).toBe(Hosts.YOUTUBE);
        });

        it('does not match youtube playlist url', () => {
            expect(getHost('www.youtube.com/playlist?')).not.toBe(Hosts.YOUTUBE);
        });

        it('matches bandcamp url', () => {
            expect(getHost('www.artist.bandcamp.com/track')).toBe(Hosts.BANDCAMP);
        });

        it('returns undefined if no matching host recognised', () => {
            expect(getHost('www.mynewfancyhost.com')).toBe(undefined);
        });
    });
});
